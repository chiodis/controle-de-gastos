# API ControleGastos - Guia de Uso

## 🚀 Visão Geral

A API ControlGeGastos é uma aplicação Web API em ASP.NET Core 9.0 desenvolvida para gerenciar receitas e despesas com validações de regras de negócio obrigatórias.

---

## 📊 Arquitetura da Aplicação

```
┌─────────────────────────────────────┐
│  Controllers                         │
│  ├─ PessoasController               │
│  ├─ CategoriasController            │
│  ├─ TransacoesController            │
│  └─ RelatoriosController            │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  Services (Injeção de Dependência)  │
│  ├─ IPessoaService                 │
│  ├─ ICategoriaService              │
│  └─ ITransacaoService              │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  AppDbContext                        │
│  (Entity Framework Core + SQLite)   │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  Banco de Dados (SQLite)            │
│  ├─ Pessoas                         │
│  ├─ Categorias                      │
│  └─ Transações                      │
└─────────────────────────────────────┘
```

---

## 🏃 Como Executar

### Pré-requisitos

- .NET 9.0 SDK instalado
- SQLite (incluído no EF Core)

### Passos

```bash
# 1. Navegar até o diretório do projeto
cd c:\Lucas\ControleDeGastos\ControleGastos.Api

# 2. Restaurar dependências
dotnet restore

# 3. Compilar o projeto
dotnet build

# 4. Executar a aplicação
dotnet run

# A API estará disponível em:
# https://localhost:7100 (HTTPS)
# ou
# http://localhost:5012 (HTTP)
```

---

## 📋 Endpoints Disponíveis

### Pessoas

- `GET    /api/pessoas` - Listar todas as pessoas
- `GET    /api/pessoas/{id}` - Obter pessoa específica
- `POST   /api/pessoas` - Criar nova pessoa
- `PUT    /api/pessoas/{id}` - Atualizar pessoa
- `DELETE /api/pessoas/{id}` - Deletar pessoa

### Categorias

- `GET    /api/categorias` - Listar todas as categorias
- `GET    /api/categorias/{id}` - Obter categoria específica
- `POST   /api/categorias` - Criar nova categoria
- `PUT    /api/categorias/{id}` - Atualizar categoria
- `DELETE /api/categorias/{id}` - Deletar categoria

### Transações

- `GET    /api/transacoes` - Listar todas as transações
- `GET    /api/transacoes/{id}` - Obter transação específica
- `POST   /api/transacoes` - Criar nova transação ⭐ (com validações)
- `PUT    /api/transacoes/{id}` - Atualizar transação ⭐ (com validações)
- `DELETE /api/transacoes/{id}` - Deletar transação

### Relatórios 📊

- `GET    /api/relatorios/totais-por-pessoa` - Totais agrupados por Pessoa
- `GET    /api/relatorios/totais-por-categoria` - Totais agrupados por Categoria

---

## ⭐ Validações de Regras de Negócio (TransacaoService)

### 1️⃣ Regra de Menor de Idade

**Descrição:** Pessoas menores de 18 anos só podem registrar transações do tipo **Despesa**. Não podem registrar **Receitas**.

**Cenários:**

- ✅ Pessoa com 16 anos registrando Despesa → **PERMITIDO**
- ❌ Pessoa com 16 anos registrando Receita → **BLOQUEADO** com exceção
- ✅ Pessoa com 25 anos registrando Receita → **PERMITIDO**

**Erro Retornado:**

```json
{
  "erro": "A pessoa 'João' tem 16 anos e não pode registrar transações do tipo Receita. Menores de 18 anos só podem registrar transações do tipo Despesa."
}
```

---

### 2️⃣ Regra de Finalidade da Categoria

**Descrição:** A finalidade da categoria deve ser compatível com o tipo da transação.

**Matriz de Compatibilidade:**

| Tipo Transação | Finalidade Categoria | Resultado    |
| -------------- | -------------------- | ------------ |
| Despesa        | Despesa              | ✅ PERMITIDO |
| Despesa        | Receita              | ❌ BLOQUEADO |
| Despesa        | Ambas                | ✅ PERMITIDO |
| Receita        | Despesa              | ❌ BLOQUEADO |
| Receita        | Receita              | ✅ PERMITIDO |
| Receita        | Ambas                | ✅ PERMITIDO |

**Erro Retornado:**

```json
{
  "erro": "A categoria 'Salário' com finalidade 'Receita' não é compatível com transações do tipo 'Despesa'. Por favor, escolha uma categoria com finalidade compatível."
}
```

---

## 📊 Endpoints de Relatórios

### GET /api/relatorios/totais-por-pessoa

**Descrição:** Retorna totais consolidados agrupados por pessoa.

**Resposta Exemplo:**

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
    }
  ],
  "totalGeral": {
    "totalReceitasGeral": 5000.0,
    "totalDespesasGeral": 1500.5,
    "saldoGeral": 3499.5,
    "totalTransacoesGeral": 5,
    "totalPessoas": 1
  }
}
```

---

### GET /api/relatorios/totais-por-categoria

**Descrição:** Retorna totais consolidados agrupados por categoria.

**Resposta Exemplo:**

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
    }
  ],
  "totalGeral": {
    "totalReceitasGeral": 5000.0,
    "totalDespesasGeral": 1500.5,
    "saldoGeral": 3499.5,
    "totalTransacoesGeral": 11,
    "totalPessoas": 1
  }
}
```

---

## 💾 Banco de Dados

### Tabelas Criadas

#### Pessoas

```sql
CREATE TABLE Pessoas (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Nome TEXT NOT NULL (MAX 200),
  Descricao TEXT,
  DataCriacao TEXT NOT NULL
);
```

#### Categorias

```sql
CREATE TABLE Categorias (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Nome TEXT NOT NULL (MAX 200),
  Descricao TEXT,
  Finalidade INTEGER NOT NULL,
  DataCriacao TEXT NOT NULL
);
```

#### Transacoes

```sql
CREATE TABLE Transacoes (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Descricao TEXT NOT NULL (MAX 400),
  Valor DECIMAL(18,2) NOT NULL,
  Tipo INTEGER NOT NULL,
  Data TEXT NOT NULL,
  DataCriacao TEXT NOT NULL,
  PessoaId INTEGER NOT NULL,
  CategoriaId INTEGER NOT NULL,
  FOREIGN KEY (PessoaId) REFERENCES Pessoas(Id) ON DELETE CASCADE,
  FOREIGN KEY (CategoriaId) REFERENCES Categorias(Id) ON DELETE CASCADE
);
```

### Cascade Delete

- Ao deletar uma **Pessoa**, todas as suas **Transações** são deletadas automaticamente.
- Ao deletar uma **Categoria**, todas as suas **Transações** são deletadas automaticamente.

---

## 🔧 Enums

### TipoTransacao

- `1` = Receita
- `2` = Despesa

### FinalidadeCategoria

- `1` = Despesa
- `2` = Receita
- `3` = Ambas

---

## 📁 Estrutura do Projeto

```
ControleGastos.Api/
├── Controllers/
│   ├── PessoasController.cs
│   ├── CategoriasController.cs
│   ├── TransacoesController.cs
│   └── RelatoriosController.cs
├── Models/
│   ├── Pessoa.cs
│   ├── Categoria.cs
│   ├── Transacao.cs
│   ├── TipoTransacao.cs
│   ├── FinalidadeCategoria.cs
│   └── Exceptions/
│       ├── MenorDeIdadeComReceita.cs
│       └── FinalidadeCategoriaNaoCompativel.cs
├── Services/
│   ├── IPessoaService.cs
│   ├── PessoaService.cs
│   ├── ICategoriaService.cs
│   ├── CategoriaService.cs
│   ├── ITransacaoService.cs
│   └── TransacaoService.cs
├── Data/
│   └── AppDbContext.cs
├── DTOs/
│   ├── RelatorioTotalPessoaDto.cs
│   ├── RelatorioTotalPessoasResponseDto.cs
│   ├── RelatorioTotalCategoriaDto.cs
│   ├── RelatorioTotalCategoriasResponseDto.cs
│   └── TotalGeralDto.cs
├── Migrations/
│   └── 20260325220857_InitialCreate.cs
├── Program.cs
├── appsettings.json
├── ControleGastos.Api.csproj
├── ControleGastos.db (Banco de Dados SQLite)
├── README.md
├── SERVICES.md
└── CONTROLLERS.md
```

---

## 🧪 Exemplos de Requisições (cURL)

### Criar Pessoa

```bash
curl -X POST "https://localhost:7100/api/pessoas" \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","descricao":"Desenvolvedor"}'
```

### Criar Categoria

```bash
curl -X POST "https://localhost:7100/api/categorias" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Salário","descricao":"Receita mensal","finalidade":2}'
```

### Criar Transação (Receita)

```bash
curl -X POST "https://localhost:7100/api/transacoes" \
  -H "Content-Type: application/json" \
  -d '{
    "descricao":"Salário de março",
    "valor":5000.00,
    "tipo":1,
    "data":"2026-03-25",
    "pessoaId":1,
    "categoriaId":1
  }'
```

### Criar Transação (Despesa)

```bash
curl -X POST "https://localhost:7100/api/transacoes" \
  -H "Content-Type: application/json" \
  -d '{
    "descricao":"Compra de alimentos",
    "valor":150.50,
    "tipo":2,
    "data":"2026-03-25",
    "pessoaId":1,
    "categoriaId":2
  }'
```

### Obter Relatório de Totais por Pessoa

```bash
curl -X GET "https://localhost:7100/api/relatorios/totais-por-pessoa"
```

### Obter Relatório de Totais por Categoria

```bash
curl -X GET "https://localhost:7100/api/relatorios/totais-por-categoria"
```

---

## 📝 Documentação XML

Todo o código inclui comentários XML (///) documentando:

- ✅ Descrição de cada método
- ✅ Parâmetros e tipos de retorno
- ✅ Exceções lançadas
- ✅ Exemplos de uso
- ✅ Regras de negócio específicas

---

## ✅ Status da Implementação

- ✅ Projeto criado e compilado
- ✅ Banco de dados com SQLite
- ✅ Modelos com Data Annotations
- ✅ Services com injeção de dependência
- ✅ Controllers CRUD
- ✅ Validações de regras de negócio
- ✅ Endpoints de relatórios
- ✅ DTOs para transferência de dados
- ✅ Documentação XML completa
- ✅ Build sem erros

---

## 🚀 Próximos Passos

1. **Testes Unitários** - Criar testes para validações
2. **Testes de Integração** - Testar endpoints
3. **Autenticação** - Implementar JWT
4. **Frontend** - Criar interface com React/Angular/Vue
5. **Deploy** - Publicar em servidor
6. **Logs** - Implementar sistema de logs
7. **Cache** - Adicionar caching aos endpoints de relatórios

---

## 📞 Suporte

Para mais informações, consulte:

- [README.md](README.md) - Configuração inicial
- [SERVICES.md](SERVICES.md) - Detalhes dos Services
- [CONTROLLERS.md](CONTROLLERS.md) - Documentação dos Controllers
