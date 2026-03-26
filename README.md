# Controle de Gastos

Sistema de controle de gastos pessoais construído com **ASP.NET Core 9.0** (Backend) e **React + TypeScript** (Frontend).

## 🎯 Funcionalidades

- ✅ **Gestão de Pessoas** - Criar, editar, deletar pessoas
- ✅ **Gestão de Categorias** - Categorizar receitas e despesas
- ✅ **Gestão de Transações** - Registrar receitas e despesas
- ✅ **Relatórios** - Dashboard com totalizações por pessoa e categoria
- ✅ **Validações** - Menores de idade não podem registrar receitas, compatibilidade de categoria

## 🛠️ Stack Tecnológico

### Backend
- **ASP.NET Core 9.0**
- **Entity Framework Core**
- **SQLite**
- **C#**

### Frontend
- **React 18+**
- **TypeScript**
- **Vite**
- **Axios**
- **React Router DOM**

## 📋 Pré-requisitos

- **.NET 9.0 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm** (vem com Node.js)

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o Repositório

```bash
git clone <url-do-seu-repo>
cd ControleDeGastos
```

### 2️⃣ Rodar o Backend

```bash
cd ControleGastos.Api
dotnet restore
dotnet run
```

O backend iniciará em: **http://localhost:5227**

### 3️⃣ Rodar o Frontend

Em outro terminal:

```bash
cd front-end
npm install
npm run dev
```

O frontend iniciará em: **http://localhost:5173**

### 4️⃣ Acessar a Aplicação

Abra seu navegador e acesse: **http://localhost:5173/**

---

## 📁 Estrutura do Projeto

```
ControleDeGastos/
├── ControleGastos.Api/        # Backend ASP.NET Core
│   ├── Controllers/           # Endpoints da API
│   ├── Services/              # Lógica de negócio
│   ├── Models/                # Entidades do banco
│   ├── Data/                  # Contexto do banco
│   └── Program.cs             # Configuração da aplicação
│
├── front-end/                 # Frontend React
│   ├── src/
│   │   ├── pages/            # Componentes de página
│   │   ├── services/         # Integração com API
│   │   ├── types/            # Tipos TypeScript
│   │   └── App.tsx           # Rotas da aplicação
│   └── package.json
│
└── README.md
```

---

## 🧪 Testando a Aplicação

### Fluxo Completo de Teste

1. **Criar uma Pessoa**
   - Menu: Pessoas → Nova Pessoa
   - Preencha: Nome, Descrição

2. **Criar Categorias**
   - Menu: Categorias → Nova Categoria
   - Exemplos:
     - "Salário" (Finalidade: Receita)
     - "Alimentação" (Finalidade: Despesa)

3. **Criar Transações**
   - Menu: Transações → Nova Transação
   - Selecione: Pessoa, Tipo, Categoria, Valor, Data

4. **Ver Relatórios**
   - Menu: Dashboard
   - Visualize totalizações por pessoa e categoria

### 🚨 Testes de Validação

**Teste 1: Regra de Menor de Idade**
- Criar uma nova pessoa
- Tentar fazer uma transação de Receita com ela
- ❌ Deve dar erro: "Menores de idade não podem registrar receitas"

**Teste 2: Incompatibilidade de Categoria**
- Tentar registrar Receita em categoria de Despesa
- ❌ Deve dar erro: "Categoria não é compatível com o tipo"

---

## 🗄️ Banco de Dados

O projeto usa **SQLite** com arquivo local: `ControleGastos.Api/ControleGastos.db`

Migrations já foram aplicadas. Não é necessário fazer nada especial.

---

## 📝 Funcionalidades Principais

### Backend (ASP.NET Core)

**Controllers:**
- `PessoasController` - CRUD de Pessoas
- `CategoriasController` - CRUD de Categorias
- `TransacoesController` - CRUD de Transações com validações
- `RelatoriosController` - Endpoints de relatórios

**Services:**
- `PessoaService` - Lógica de pessoas
- `CategoriaService` - Lógica de categorias
- `TransacaoService` - Lógica de transações + 2 validações críticas

**Validações Implementadas:**
1. Menores de idade (< 18 anos) só podem registrar Despesas
2. Tipo de transação deve ser compatível com Finalidade da Categoria

### Frontend (React)

**Páginas:**
- `Dashboard.tsx` - Relatórios consolidados
- `PessoasList.tsx` - Lista e gerenciamento de pessoas
- `PessoaForm.tsx` - Criar/editar pessoa
- `CategoriasList.tsx` - Lista e gerenciamento de categorias
- `CategoriaForm.tsx` - Criar/editar categoria
- `TransacoesList.tsx` - Lista e gerenciamento de transações
- `TransacaoForm.tsx` - Criar/editar transação

**Services:**
- `pessoaService.ts` - Chamadas API de pessoas
- `categoriaService.ts` - Chamadas API de categorias
- `transacaoService.ts` - Chamadas API de transações
- `relatorioService.ts` - Chamadas API de relatórios

---

## ⚙️ Configurações

### URL da API (Frontend)

Localização: `front-end/src/services/api.ts`

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5227',  // ← Porta do backend
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Banco de Dados (Backend)

Localização: `ControleGastos.Api/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=ControleGastos.db"
  }
}
```

---

## 🐛 Troubleshooting

**Erro: "Erro ao carregar transações"**
- Verifique se o backend está rodando em http://localhost:5227
- Verifique se o frontend está apontando para a porta correta em `api.ts`

**Erro: "Failed to bind to address"**
- Talvez a porta 5227 já esteja em uso
- Mate os processos antigos e reinicie

**Erro de conexão do Frontend**
- Certifique-se que ambos servidor estão rodando
- Abra DevTools (F12) e verifique console para erros de rede

---

## 📦 Dependências Principais

### Backend
```
Microsoft.EntityFrameworkCore.Sqlite
Microsoft.AspNetCore.Mvc
```

### Frontend
```
react: ^18.x
typescript: ^5.x
vite: ^8.x
axios: ^1.x
react-router-dom: ^6.x
```

---

## ✅ Checklist de Entrega

Antes de enviar para o recrutador:

- [ ] Backend compilando sem erros
- [ ] Frontend compilando sem erros (npm run build)
- [ ] Ambos servidores rodando sem problemas
- [ ] Testou: create, read, update, delete de Pessoas
- [ ] Testou: create, read, update, delete de Categorias
- [ ] Testou: create, read, update, delete de Transações
- [ ] Testou: Dashboard com dados corretos
- [ ] Testou: Validação de menor de idade
- [ ] Testou: Validação de compatibilidade de categoria
- [ ] README.md completo e claro

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs do terminal
2. Abra DevTools (F12) no navegador
3. Verifique se portas 5227 e 5173 estão livres
4. Reinstale dependências: `npm install` e `dotnet restore`

---

**Desenvolvido para teste técnico - Nível Júnior**
