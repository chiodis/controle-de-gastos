# 🚀 QUICK START - Como Rodar o Projeto

## ⚡ Em 3 Passos Simples:

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/SEU_USUARIO/controle-de-gastos.git
cd controle-de-gastos
```

### Passo 2: Rodar o Backend

Abra um **terminal** e execute:

```bash
cd ControleGastos.Api
dotnet restore
dotnet run
```

✅ Você deve ver:

```
Now listening on: http://localhost:5227
Application started.
```

### Passo 3: Rodar o Frontend

Abra **outro terminal** e execute:

```bash
cd front-end
npm install
npm run dev
```

✅ Você deve ver:

```
➜  Local:   http://localhost:5173/
```

## 🌐 Acessar a Aplicação

Abra seu navegador em: **http://localhost:5173/**

---

## 📸 Screenshots das Funcionalidades

### 1. Menu Principal

- Dashboard
- Pessoas
- Categorias
- Transações

### 2. Dashboard

Mostra totalizações:

- Total de receitas por pessoa
- Total de despesas por pessoa
- Saldo consolidado
- Total por categoria

### 3. Gerenciar Pessoas

- Listar todas
- Criar nova (com nome e descrição)
- Editar
- Deletar

### 4. Gerenciar Categorias

- Listar todas com Finalidade (Receita/Despesa/Ambas)
- Criar nova
- Editar
- Deletar

### 5. Gerenciar Transações

- Listar com pessoa, categoria, descrição, tipo, valor
- Criar nova (com validações)
- Editar
- Deletar

---

## 🧪 Testes Inclusos

### ✅ Teste 1: Sistema Básico

- Criar 1 Pessoa
- Criar 2 Categorias (1 Receita, 1 Despesa)
- Criar 3 Transações (1 receita, 2 despesas)
- Verificar Dashboard

### ⚠️ Teste 2: Validação de Menor de Idade

1. Criar nova pessoa
2. Tentar fazer Receita com ela
3. Sistema deve rejeitar com erro

### ⚠️ Teste 3: Validação de Categoria

1. Criar Transação com Tipo Receita
2. Selecionar Categoria com Finalidade Despesa
3. Sistema deve rejeitar com erro

---

## 🐛 Se der Erro

### "Erro ao carregar transações"

- [ ] Verifique se backend está rodando (terminal 1)
- [ ] Verifique se mostra "listening on http://localhost:5227"
- [ ] Aguarde 5 segundos e recarregue página

### "Cannot GET /api/transacoes"

- [ ] Backend não iniciou
- [ ] Execute: `cd ControleGastos.Api && dotnet run`

### "npm: command not found"

- [ ] Node.js não está instalado
- [ ] Instale em: https://nodejs.org/

### "dotnet: command not found"

- [ ] .NET 9.0 SDK não está instalado
- [ ] Instale em: https://dotnet.microsoft.com/download

---

## 📁 Estrutura de Arquivos

```
controle-de-gastos/
│
├── README.md                          # Documentação principal
├── GUIA_GIT.md                        # Como fazer push
├── QUICK_START.md                     # Este arquivo
│
├── ControleGastos.Api/                # BACKEND
│   ├── Controllers/
│   │   ├── PessoasController.cs
│   │   ├── CategoriasController.cs
│   │   ├── TransacoesController.cs
│   │   └── RelatoriosController.cs
│   │
│   ├── Services/
│   │   ├── PessoaService.cs
│   │   ├── CategoriaService.cs
│   │   └── TransacaoService.cs        # ← Validações aqui
│   │
│   ├── Models/
│   │   ├── Pessoa.cs
│   │   ├── Categoria.cs
│   │   ├── Transacao.cs
│   │   ├── TipoTransacao.cs           # Enum: Receita, Despesa
│   │   └── FinalidadeCategoria.cs     # Enum: Receita, Despesa, Ambas
│   │
│   ├── Data/
│   │   └── AppDbContext.cs            # EF Core Context
│   │
│   ├── Program.cs                     # DI, CORS, DB config
│   ├── appsettings.json               # Configuração
│   └── ControleGastos.db              # SQLite (gerado)
│
├── front-end/                         # FRONTEND
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx          # Relatórios
│   │   │   ├── PessoasList.tsx        # Lista pessoas
│   │   │   ├── PessoaForm.tsx         # Formulário pessoa
│   │   │   ├── CategoriasList.tsx     # Lista categorias
│   │   │   ├── CategoriaForm.tsx      # Formulário categoria
│   │   │   ├── TransacoesList.tsx     # Lista transações
│   │   │   └── TransacaoForm.tsx      # Formulário transação
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts                 # Axios config (porta 5227)
│   │   │   ├── pessoaService.ts
│   │   │   ├── categoriaService.ts
│   │   │   ├── transacaoService.ts
│   │   │   └── relatorioService.ts
│   │   │
│   │   ├── types/
│   │   │   └── index.ts               # Interfaces TypeScript
│   │   │
│   │   ├── App.tsx                    # Rotas
│   │   └── main.tsx                   # Entry point
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── .git/                               # Controle de versão
```

---

## ⏱️ Tempo Estimado

- **Clonar**: 30 segundos
- **npm install**: 2-3 minutos (primeira vez)
- **dotnet restore**: 1-2 minutos (primeira vez)
- **Rodar backends**: 30 segundos
- **Total**: ~5-7 minutos

---

## ✅ Checklist

Quando receber seu projeto, ele deve:

- [ ] Clonar o repositório
- [ ] Rodar backend (`dotnet run`)
- [ ] Rodar frontend (`npm run dev`)
- [ ] Acessar em http://localhost:5173
- [ ] Criar pessoas
- [ ] Criar categorias
- [ ] Criar transações
- [ ] Ver relatórios no dashboard
- [ ] Testar validações
- [ ] Revisar código (Services, Controllers, componentes)

---
