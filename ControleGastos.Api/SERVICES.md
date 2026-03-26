# Services - Camada de Negócio com Validações

## Visão Geral

Foram criados Services para implementar a lógica de negócio com foco especial nas validações obrigatórias do teste técnico. Todos os Services utilizam **injeção de dependência** via interfaces.

---

## Estrutura de Pastas

```
Services/
├── IPessoaService.cs           # Interface para Pessoa
├── PessoaService.cs            # Implementação para Pessoa
├── ICategoriaService.cs        # Interface para Categoria
├── CategoriaService.cs         # Implementação para Categoria
├── ITransacaoService.cs        # Interface para Transacao
└── TransacaoService.cs         # Implementação para Transacao (com validações)

Models/Exceptions/
├── MenorDeIdadeComReceita.cs               # Exceção para regra de menor de idade
└── FinalidadeCategoriaNaoCompativel.cs    # Exceção para regra de finalidade
```

---

## Services Implementados

### 1. IPessoaService / PessoaService

**Responsabilidades:**

- Obter uma pessoa por ID
- Listar todas as pessoas
- Criar nova pessoa
- Atualizar pessoa
- Deletar pessoa (com Cascade Delete automático)

**Métodos:**

- `ObterPorIdAsync(int id)`
- `ObterTodosAsync()`
- `CriarAsync(Pessoa pessoa)`
- `AtualizarAsync(int id, Pessoa pessoa)`
- `DeletarAsync(int id)`

---

### 2. ICategoriaService / CategoriaService

**Responsabilidades:**

- Obter uma categoria por ID
- Listar todas as categorias
- Criar nova categoria
- Atualizar categoria
- Deletar categoria (com Cascade Delete automático)

**Métodos:**

- `ObterPorIdAsync(int id)`
- `ObterTodosAsync()`
- `CriarAsync(Categoria categoria)`
- `AtualizarAsync(int id, Categoria categoria)`
- `DeletarAsync(int id)`

---

### 3. ITransacaoService / TransacaoService ⭐

Este é o serviço mais crítico do projeto, pois implementa as **validações obrigatórias do teste**.

#### Métodos:

- `ObterPorIdAsync(int id)`
- `ObterTodosAsync()`
- `CriarAsync(Transacao transacao)` ← **COM VALIDAÇÕES**
- `AtualizarAsync(int id, Transacao transacao)` ← **COM VALIDAÇÕES**
- `DeletarAsync(int id)`

#### Validações Implementadas no TransacaoService:

##### ✅ VALIDAÇÃO 1: REGRA DE MENOR DE IDADE

**Objetivo:** Pessoas menores de 18 anos não podem registrar transações do tipo "Receita".

**Implementação:**

```csharp
// Calcula idade da pessoa
var idade = CalcularIdade(pessoa.DataCriacao);

// Se menor de 18 AND tipo é Receita, lança exceção
if (idade < 18 && transacao.Tipo == TipoTransacao.Receita)
{
    throw new MenorDeIdadeComReceita(
        $"A pessoa '{pessoa.Nome}' tem {idade} anos e não pode registrar " +
        $"transações do tipo Receita. Menores de 18 anos só podem registrar " +
        $"transações do tipo Despesa.");
}
```

**Comportamento:**

- ✅ Menor de 18 anos registrando **Despesa** → PERMITIDO
- ❌ Menor de 18 anos registrando **Receita** → LANÇA EXCEÇÃO
- ✅ Maior de 18 anos registrando **Receita** → PERMITIDO
- ✅ Maior de 18 anos registrando **Despesa** → PERMITIDO

**Exceção Lançada:** `MenorDeIdadeComReceita`

---

##### ✅ VALIDAÇÃO 2: REGRA DE FINALIDADE DA CATEGORIA

**Objetivo:** A finalidade da categoria deve ser compatível com o tipo da transação.

**Implementação:**

```csharp
bool finalidadeCompativel = ValidarFinalidadeCategoria(transacao.Tipo, categoria.Finalidade);

if (!finalidadeCompativel)
{
    throw new FinalidadeCategoriaNaoCompativel(
        $"A categoria '{categoria.Nome}' com finalidade '{categoria.Finalidade}' " +
        $"não é compatível com transações do tipo '{transacao.Tipo}'.");
}
```

**Matriz de Compatibilidade:**

| Tipo Transação | Finalidade Categoria | Resultado    |
| -------------- | -------------------- | ------------ |
| Despesa        | Despesa              | ✅ PERMITIDO |
| Despesa        | Receita              | ❌ BLOQUEADO |
| Despesa        | Ambas                | ✅ PERMITIDO |
| Receita        | Despesa              | ❌ BLOQUEADO |
| Receita        | Receita              | ✅ PERMITIDO |
| Receita        | Ambas                | ✅ PERMITIDO |

**Exceção Lançada:** `FinalidadeCategoriaNaoCompativel`

---

## Exceções Customizadas

### MenorDeIdadeComReceita

```csharp
namespace ControleGastos.Api.Models.Exceptions
{
    public class MenorDeIdadeComReceita : Exception { ... }
}
```

**Mensagem padrão:**

> "Menores de idade só podem registrar transações do tipo Despesa. Receitas não são permitidas para pessoas com menos de 18 anos."

---

### FinalidadeCategoriaNaoCompativel

```csharp
namespace ControleGastos.Api.Models.Exceptions
{
    public class FinalidadeCategoriaNaoCompativel : Exception { ... }
}
```

**Mensagem padrão:**

> "A finalidade da categoria não é compatível com o tipo da transação."

---

## Injeção de Dependência

Todos os Services estão registrados no `Program.cs` usando escopo **Scoped**:

```csharp
// Registrar injeção de dependência dos Services
builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();
```

**Uso em Controllers:**

```csharp
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public TransacaoController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpPost]
    public async Task<ActionResult<Transacao>> Criar([FromBody] Transacao transacao)
    {
        try
        {
            var resultado = await _transacaoService.CriarAsync(transacao);
            return CreatedAtAction(nameof(Criar), new { id = resultado.Id }, resultado);
        }
        catch (MenorDeIdadeComReceita ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
        catch (FinalidadeCategoriaNaoCompativel ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }
}
```

---

## Comentários XML

Todo o código inclui comentários XML (///) documentando:

- O propósito de cada método
- Parâmetros e retornos
- Exceções lançadas
- Regras de negócio específicas

Exemplo:

```csharp
/// <summary>
/// Cria uma nova transação no banco de dados com validações de regras de negócio.
///
/// Validações executadas:
/// 1. Verifica se a Pessoa existe
/// 2. Verifica se a Categoria existe
/// 3. Aplica a "Regra de Menor de Idade"
/// 4. Aplica a "Regra de Finalidade da Categoria"
/// </summary>
/// <exception cref="MenorDeIdadeComReceita">Se menor de idade tentar registrar Receita</exception>
/// <exception cref="FinalidadeCategoriaNaoCompativel">Se a finalidade não for compatível</exception>
```

---

## Status de Build

✅ **Projeto compila com sucesso!**

Avisos (não impedem execução):

- 10 avisos sobre nullable reference types (esperados em nullable reference types habilitado)

---

## Fluxo de Criação de Transação

```
Cliente HTTP
    ↓
POST /api/transacao
    ↓
TransacaoController.CriarAsync()
    ↓
ITransacaoService.CriarAsync(transacao)
    ↓
┌─→ Busca Pessoa no banco
│   └─→ Se não encontrada: throw KeyNotFoundException
│
├─→ Busca Categoria no banco
│   └─→ Se não encontrada: throw KeyNotFoundException
│
├─→ VALIDAÇÃO 1: Verifica Menor de Idade
│   └─→ Se violada: throw MenorDeIdadeComReceita
│
├─→ VALIDAÇÃO 2: Verifica Compatibilidade de Finalidade
│   └─→ Se violada: throw FinalidadeCategoriaNaoCompativel
│
└─→ Se todas as validações passarem: Salvar no banco
    ↓
Transação Criada ✅
```

---

## Próximos Passos

- [ ] Criar Controllers para Pessoa, Categoria e Transacao
- [ ] Criar DTOs para requisições e respostas
- [ ] Adicionar testes unitários para validações
- [ ] Implementar Frontend
