# ControleGastos.Api

Projeto Web API em ASP.NET Core 9.0 para gerenciamento de controle de gastos.

## Estrutura do Projeto

```
ControleGastos.Api/
├── Models/           # Entidades e Enums
├── Data/            # DbContext e configurações de banco
├── Services/        # Lógica de negócio
├── Controllers/     # API endpoints
├── DTOs/            # Data Transfer Objects
└── Migrations/      # Entity Framework Migrations
```

## Modelos

### Pessoa

- **Id**: Identificador único
- **Nome**: Texto obrigatório (máx 200 caracteres)
- **Descricao**: Texto opcional (máx 400 caracteres)
- **DataCriacao**: Data de criação automática
- **Navegação**: Coleção de Transações

### Categoria

- **Id**: Identificador único
- **Nome**: Texto obrigatório (máx 200 caracteres)
- **Descricao**: Texto opcional (máx 400 caracteres)
- **Finalidade**: Enum (Despesa, Receita, Ambas)
- **DataCriacao**: Data de criação automática
- **Navegação**: Coleção de Transações

### Transacao

- **Id**: Identificador único
- **Descricao**: Texto obrigatório (máx 400 caracteres)
- **Valor**: Valor decimal com 2 casas (18,2)
- **Tipo**: Enum (Receita: 1, Despesa: 2)
- **Data**: Data da transação
- **DataCriacao**: Data de criação automática
- **PessoaId**: Chave estrangeira (ON DELETE CASCADE)
- **CategoriaId**: Chave estrangeira (ON DELETE CASCADE)
- **Navegação**: Referências para Pessoa e Categoria

## Enums

### TipoTransacao

- 1: Receita
- 2: Despesa

### FinalidadeCategoria

- 1: Despesa
- 2: Receita
- 3: Ambas

## Banco de Dados

O projeto usa **SQLite** como provedor de banco de dados. O arquivo de banco é criado automaticamente como `ControleGastos.db` no diretório raiz do projeto.

### Comportamento de Cascade Delete

- Quando uma **Pessoa** é deletada, todas as suas **Transações** são automaticamente deletadas
- Quando uma **Categoria** é deletada, todas as suas **Transações** são automaticamente deletadas

## Configuração

### Dependências Instaladas

- `Microsoft.EntityFrameworkCore.Sqlite` (9.0.5)
- `Microsoft.EntityFrameworkCore.Tools` (9.0.5)
- `Microsoft.AspNetCore.OpenApi` (9.0.5)

### Connection String

```
Data Source=ControleGastos.db
```

## Executar o Projeto

```bash
# Restaurar dependências
dotnet restore

# Executar o projeto
dotnet run

# Ver as migrations
dotnet ef migrations list

# Criar uma nova migration
dotnet ef migrations add NomeDaMigration

# Atualizar o banco de dados
dotnet ef database update
```

## Próximos Passos

- [ ] Criar Controllers para Pessoas, Categorias e Transações
- [ ] Criar DTOs para requisições e respostas
- [ ] Implementar Services com lógica de negócio
- [ ] Adicionar validações
- [ ] Criar testes unitários
- [ ] Implementar Frontend em React/Angular/Vue
