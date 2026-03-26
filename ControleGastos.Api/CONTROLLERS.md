# Controllers e Endpoints da API

## Visão Geral

Foram criados 4 Controllers para exposição dos endpoints da API:

1. **PessoasController** - CRUD de Pessoas
2. **CategoriasController** - CRUD de Categorias
3. **TransacoesController** - CRUD de Transações (com validações)
4. **RelatoriosController** - Relatórios consolidados de totais

---

## 1. PessoasController

**Rota Base:** `GET/POST api/pessoas`

### Endpoints

#### ✅ GET /api/pessoas

Obtém todas as pessoas cadastradas.

**Resposta (200 OK):**

```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "descricao": "Pessoa física",
    "dataCriacao": "2026-03-25T00:00:00"
  }
]
```

---

#### ✅ GET /api/pessoas/{id}

Obtém uma pessoa específica pelo ID.

**Parâmetros:**

- `id` (int, required) - ID da pessoa

**Resposta (200 OK):**

```json
{
  "id": 1,
  "nome": "João Silva",
  "descricao": "Pessoa física",
  "dataCriacao": "2026-03-25T00:00:00"
}
```

**Erros:**

- 404 Not Found - Se a pessoa não existir

---

#### ✅ POST /api/pessoas

Cria uma nova pessoa.

**Body:**

```json
{
  "nome": "João Silva",
  "descricao": "Pessoa física"
}
```

**Resposta (201 Created):**

```json
{
  "id": 1,
  "nome": "João Silva",
  "descricao": "Pessoa física",
  "dataCriacao": "2026-03-25T00:00:00"
}
```

**Erros:**

- 400 Bad Request - Dados inválidos

---

#### ✅ PUT /api/pessoas/{id}

Atualiza uma pessoa existente.

**Parâmetros:**

- `id` (int, required) - ID da pessoa

**Body:**

```json
{
  "nome": "João Silva Atualizado",
  "descricao": "Novo nome"
}
```

**Resposta (200 OK):** Pessoa atualizada

**Erros:**

- 400 Bad Request - Dados inválidos
- 404 Not Found - Se a pessoa não existir

---

#### ✅ DELETE /api/pessoas/{id}

Deleta uma pessoa. **Nota:** Todas as transações associadas serão deletadas automaticamente (Cascade Delete).

**Parâmetros:**

- `id` (int, required) - ID da pessoa

**Resposta:** 204 No Content

**Erros:**

- 404 Not Found - Se a pessoa não existir

---

## 2. CategoriasController

**Rota Base:** `GET/POST api/categorias`

### Endpoints

Segue o mesmo padrão do PessoasController:

#### ✅ GET /api/categorias

Obtém todas as categorias.

#### ✅ GET /api/categorias/{id}

Obtém uma categoria específica.

#### ✅ POST /api/categorias

Cria uma nova categoria.

**Body:**

```json
{
  "nome": "Alimentação",
  "descricao": "Despesas com alimentação",
  "finalidade": 1
}
```

**Valores de Finalidade:**

- `1` = Despesa
- `2` = Receita
- `3` = Ambas

#### ✅ PUT /api/categorias/{id}

Atualiza uma categoria.

#### ✅ DELETE /api/categorias/{id}

Deleta uma categoria (com Cascade Delete).

---

## 3. TransacoesController ⭐

**Rota Base:** `GET/POST api/transacoes`

### Endpoints

#### ✅ GET /api/transacoes

Obtém todas as transações com dados de Pessoa e Categoria.

**Resposta (200 OK):**

```json
[
  {
    "id": 1,
    "descricao": "Salário",
    "valor": 5000.0,
    "tipo": 1,
    "data": "2026-03-25T00:00:00",
    "dataCriacao": "2026-03-25T00:00:00",
    "pessoaId": 1,
    "categoriaId": 2,
    "pessoa": {
      "id": 1,
      "nome": "João Silva",
      "descricao": "Pessoa física",
      "dataCriacao": "2026-03-25T00:00:00"
    },
    "categoria": {
      "id": 2,
      "nome": "Salário",
      "descricao": "Receita",
      "finalidade": 2,
      "dataCriacao": "2026-03-25T00:00:00"
    }
  }
]
```

---

#### ✅ GET /api/transacoes/{id}

Obtém uma transação específica.

---

#### ✅ POST /api/transacoes

Cria uma nova transação **COM VALIDAÇÕES DE REGRAS DE NEGÓCIO**.

**Body:**

```json
{
  "descricao": "Compra de alimentos",
  "valor": 150.5,
  "tipo": 2,
  "data": "2026-03-25T00:00:00",
  "pessoaId": 1,
  "categoriaId": 1
}
```

**Valores de Tipo:**

- `1` = Receita
- `2` = Despesa

**Resposta (201 Created):** Transação criada

**Validações Aplicadas:**

1️⃣ **Regra de Menor de Idade**

- Se `tipo == 1` (Receita) E pessoa `idade < 18`
- ❌ Retorna 400 Bad Request com erro: "Menores de idade só podem registrar transações do tipo Despesa"

2️⃣ **Regra de Finalidade da Categoria**

- Se transação é Despesa (tipo=2) e categoria finalidade é Receita (2)
- ❌ Retorna 400 Bad Request com erro: "A finalidade da categoria não é compatível com o tipo da transação"

**Exemplo de Erro:**

```json
{
  "erro": "Menores de idade só podem registrar transações do tipo Despesa. Receitas não são permitidas para pessoas com menos de 18 anos."
}
```

**Erros Possíveis:**

- 400 Bad Request - Dados inválidos ou violação de regras de negócio
- 404 Not Found - Pessoa ou Categoria não encontrada

---

#### ✅ PUT /api/transacoes/{id}

Atualiza uma transação com as mesmas validações de criação.

---

#### ✅ DELETE /api/transacoes/{id}

Deleta uma transação.

---

## 4. RelatoriosController 📊

**Rota Base:** `GET api/relatorios`

Este é o controller responsável pelos **relatórios consolidados de totais**.

### Endpoints Especiais

#### ✅ GET /api/relatorios/totais-por-pessoa

Retorna um relatório consolidado agrupado por **Pessoa**.

**Resposta (200 OK):**

```json
{
  "pessoas": [
    {
      "id": 1,
      "nome": "João Silva",
      "totalReceitas": 5000.0,
      "totalDespesas": 1500.5,
      "saldo": 3499.5,
      "totalTransacoes": 5
    },
    {
      "id": 2,
      "nome": "Maria Santos",
      "totalReceitas": 3000.0,
      "totalDespesas": 800.0,
      "saldo": 2200.0,
      "totalTransacoes": 3
    }
  ],
  "totalGeral": {
    "totalReceitasGeral": 8000.0,
    "totalDespesasGeral": 2300.5,
    "saldoGeral": 5699.5,
    "totalTransacoesGeral": 8,
    "totalPessoas": 2
  }
}
```

**Dados Inclusos:**

- Para cada pessoa:
  - ✅ ID
  - ✅ Nome
  - ✅ Total de Receitas
  - ✅ Total de Despesas
  - ✅ Saldo (Receita - Despesa)
  - ✅ Total de Transações

- Total Geral:
  - ✅ Soma de todas as receitas
  - ✅ Soma de todas as despesas
  - ✅ Saldo líquido geral
  - ✅ Total de transações de todas as pessoas
  - ✅ Total de pessoas

---

#### ✅ GET /api/relatorios/totais-por-categoria

Retorna um relatório consolidado agrupado por **Categoria**.

**Resposta (200 OK):**

```json
{
  "categorias": [
    {
      "id": 1,
      "nome": "Alimentação",
      "finalidade": "Despesa",
      "totalReceitas": 0.0,
      "totalDespesas": 1500.5,
      "saldo": -1500.5,
      "totalTransacoes": 10
    },
    {
      "id": 2,
      "nome": "Salário",
      "finalidade": "Receita",
      "totalReceitas": 8000.0,
      "totalDespesas": 0.0,
      "saldo": 8000.0,
      "totalTransacoes": 2
    }
  ],
  "totalGeral": {
    "totalReceitasGeral": 8000.0,
    "totalDespesasGeral": 1500.5,
    "saldoGeral": 6499.5,
    "totalTransacoesGeral": 12,
    "totalPessoas": 2
  }
}
```

**Dados Inclusos:**

- Para cada categoria:
  - ✅ ID
  - ✅ Nome
  - ✅ Finalidade
  - ✅ Total de Receitas
  - ✅ Total de Despesas
  - ✅ Saldo (Receita - Despesa)
  - ✅ Total de Transações

- Total Geral:
  - ✅ Soma de todas as receitas
  - ✅ Soma de todas as despesas
  - ✅ Saldo líquido geral
  - ✅ Total de transações
  - ✅ Total de categorias

---

## Estrutura de Arquivos

```
Controllers/
├── PessoasController.cs          # CRUD de Pessoas
├── CategoriasController.cs       # CRUD de Categorias
├── TransacoesController.cs       # CRUD de Transações (com validações)
└── RelatoriosController.cs       # Relatórios consolidados

DTOs/
├── RelatorioTotalPessoaDto.cs                # DTO de pessoa para relatório
├── RelatorioTotalPessoasResponseDto.cs       # Resposta agregada por pessoa
├── RelatorioTotalCategoriaDto.cs             # DTO de categoria para relatório
├── RelatorioTotalCategoriasResponseDto.cs    # Resposta agregada por categoria
└── TotalGeralDto.cs                          # DTO com totais gerais
```

---

## Tratamento de Erros

### Exceções de Validação (TransacoesController)

A API retorna erros apropriados com mensagens claras:

```json
{
  "erro": "A pessoa 'João' tem 16 anos e não pode registrar transações do tipo Receita. Menores de 18 anos só podem registrar transações do tipo Despesa."
}
```

```json
{
  "erro": "A categoria 'Salário' com finalidade 'Receita' não é compatível com transações do tipo 'Despesa'. Por favor, escolha uma categoria com finalidade compatível."
}
```

---

## Exemplo de Fluxo Completo

```bash
# 1. Criar uma Pessoa
POST /api/pessoas
{
  "nome": "João Silva",
  "descricao": "Desenvolvedor"
}
# Resposta: ID = 1

# 2. Criar uma Categoria
POST /api/categorias
{
  "nome": "Alimentação",
  "descricao": "Despesas com alimentos",
  "finalidade": 1
}
# Resposta: ID = 1

# 3. Criar uma Transação (Despesa)
POST /api/transacoes
{
  "descricao": "Compra de alimentos",
  "valor": 150.50,
  "tipo": 2,
  "data": "2026-03-25T00:00:00",
  "pessoaId": 1,
  "categoriaId": 1
}
# Resposta: Transação criada com ID = 1

# 4. Obter Relatório de Totais por Pessoa
GET /api/relatorios/totais-por-pessoa
# Retorna: João Silva com total de despesas de 150.50

# 5. Obter Relatório de Totais por Categoria
GET /api/relatorios/totais-por-categoria
# Retorna: Categoria "Alimentação" com total de despesas de 150.50
```

---

## Status da implementação

✅ Todos os Controllers criados e compilados com sucesso
✅ DTOs de Relatórios criados
✅ Endpoints CRUD implementados
✅ Endpoints de Relatórios implementados
✅ Validações de regras de negócio aplicadas
✅ Build sem erros (apenas avisos de nullable)

---

## Próximos Passos

- [ ] Implementar testes unitários
- [ ] Implementar testes de integração
- [ ] Adicionar autenticação e autorização
- [ ] Criar dados de seed/exemplo
- [ ] Implementar paginação nos endpoints de listagem
- [ ] Implementar filtros nos relatórios
- [ ] Criar Frontend (React/Angular/Vue)
