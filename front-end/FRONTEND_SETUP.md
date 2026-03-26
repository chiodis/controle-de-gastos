# Frontend React + TypeScript - Controle de Gastos

## 🚀 Visão Geral

Frontend desenvolvido com **Vite** + **React** + **TypeScript** para a aplicação de Controle de Gastos.

## 📦 Dependências Instaladas

```bash
npm install axios react-router-dom
```

- **axios**: Cliente HTTP para comunicação com API
- **react-router-dom**: Roteamento entre páginas

## 📁 Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis
│   └── (a ser criado)
├── pages/            # Páginas da aplicação
│   └── (a ser criado)
├── services/         # Serviços e integração com API
│   ├── api.ts              ✅ Configuração do Axios
│   ├── pessoaService.ts    ✅ CRUD de Pessoas
│   ├── categoriaService.ts ✅ CRUD de Categorias
│   ├── transacaoService.ts ✅ CRUD de Transações
│   ├── relatorioService.ts ✅ Endpoints de Relatórios
│   └── index.ts            ✅ Exportação centralizada
├── types/            # Tipos e Interfaces TypeScript
│   └── index.ts            ✅ Todas as interfaces
├── App.tsx           # Componente raiz
├── App.css           # Estilos globais
├── main.tsx          # Entry point
└── vite-env.d.ts     # Tipos do Vite
```

---

## 🔌 Integração com API

### Arquivo: `services/api.ts`

Configuração do **Axios** com:

- ✅ Base URL: `http://localhost:5012`
- ✅ Content-Type: `application/json`
- ✅ Interceptadores para logs
- ✅ Tratamento de erros

**Use:**

```typescript
import { api } from "@/services";

// Requisição customizada
api.get("/api/pessoas");
```

---

## 📋 Tipos TypeScript Disponíveis

### Enums

```typescript
import { TipoTransacao, FinalidadeCategoria } from "@/types";

// TipoTransacao
TipoTransacao.Receita; // 1
TipoTransacao.Despesa; // 2

// FinalidadeCategoria
FinalidadeCategoria.Despesa; // 1
FinalidadeCategoria.Receita; // 2
FinalidadeCategoria.Ambas; // 3
```

### Interfaces

```typescript
import { IPessoa, ICategoria, ITransacao } from "@/types";

// Exemplo de uso
const novaPessoa: IPessoa = {
  nome: "João Silva",
  descricao: "Desenvolvedor",
};

const novaCategoria: ICategoria = {
  nome: "Alimentação",
  descricao: "Despesas com alimentos",
  finalidade: FinalidadeCategoria.Despesa,
};

const novaTransacao: ITransacao = {
  descricao: "Compra de alimentos",
  valor: 150.5,
  tipo: TipoTransacao.Despesa,
  data: new Date().toISOString(),
  pessoaId: 1,
  categoriaId: 1,
};
```

---

## 🛠️ Serviços Disponíveis

### 1. pessoaService

```typescript
import { pessoaService } from "@/services";

// Listar todas as pessoas
const pessoas = await pessoaService.obterTodas();

// Obter uma pessoa específica
const pessoa = await pessoaService.obterPorId(1);

// Criar nova pessoa
const novaPessoa = await pessoaService.criar({
  nome: "Maria Santos",
  descricao: "Analista",
});

// Atualizar pessoa
const atualizada = await pessoaService.atualizar(1, {
  nome: "Maria Santos Atualizado",
});

// Deletar pessoa
await pessoaService.deletar(1);
```

---

### 2. categoriaService

```typescript
import { categoriaService } from '@/services';

// Operações idênticas ao pessoaService
const categorias = await categoriaService.obterTodas();
const categoria = await categoriaService.obterPorId(1);
const novaCategoria = await categoriaService.criar({...});
const atualizada = await categoriaService.atualizar(1, {...});
await categoriaService.deletar(1);
```

---

### 3. transacaoService ⭐ (Com Validações)

```typescript
import { transacaoService, TransacaoServiceError } from "@/services";

// Listar transações
const transacoes = await transacaoService.obterTodas();

// Criar transação COM VALIDAÇÕES
try {
  const novaTransacao = await transacaoService.criar({
    descricao: "Salário",
    valor: 5000.0,
    tipo: TipoTransacao.Receita,
    data: new Date().toISOString(),
    pessoaId: 1,
    categoriaId: 2,
  });
} catch (error) {
  if (error instanceof TransacaoServiceError) {
    console.error("Erro de validação:", error.message);
    console.error("Status:", error.statusCode);
    console.error("Detalhes:", error.apiError);
  }
}
```

#### ⚠️ Validações Aplicadas

**Erro: Regra de Menor de Idade**

```
Status: 400
Erro: "A pessoa 'João' tem 16 anos e não pode registrar transações do tipo Receita. Menores de 18 anos só podem registrar transações do tipo Despesa."
```

**Erro: Compatibilidade de Finalidade**

```
Status: 400
Erro: "A categoria 'Salário' com finalidade 'Receita' não é compatível com transações do tipo 'Despesa'."
```

---

### 4. relatorioService

```typescript
import { relatorioService } from "@/services";

// Relatório de totais por pessoa
const relatoriopessoas = await relatorioService.obterTotaisPorPessoa();
// Retorna: { pessoas: [...], totalGeral: {...} }

// Relatório de totais por categoria
const relatorioCategoras = await relatorioService.obterTotaisPorCategoria();
// Retorna: { categorias: [...], totalGeral: {...} }
```

**Exemplo de Resposta:**

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

## 🚀 Como Executar o Frontend

```bash
# Entrar na pasta do frontend
cd front-end

# Instalar dependências (já feito)
npm install

# Executar em modo de desenvolvimento
npm run dev

# Saída esperada:
# VITE v8.0.2  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

**Acesse:** http://localhost:5173

---

## 📱 Próximos Passos

1. ✅ **Setup inicial** - Vite, React, TypeScript
2. ✅ **Dependências instaladas** - Axios, React Router
3. ✅ **Serviços criados** - Integração com API
4. ✅ **Tipos criados** - Interfaces TypeScript
5. 🔜 **Criar componentes** - UI components
6. 🔜 **Criar páginas** - Home, Pessoas, Categorias, Transações, Relatórios
7. 🔜 **Implementar roteamento** - React Router
8. 🔜 **Testar com API**

---

## 🔗 Conexão com Backend

**Backend rodando em:**

- HTTP: `http://localhost:5012`
- HTTPS: `https://localhost:7100`

**Configure em:** `src/services/api.ts`

```typescript
const api = axios.create({
  baseURL: "http://localhost:5012", // ← Alterar aqui se necessário
});
```

---

## 💡 Boas Práticas

1. ✅ Use os serviços para todas as requisições HTTP
2. ✅ Trate erros de `TransacaoServiceError` para validações
3. ✅ Sempre use tipos TypeScript para dados da API
4. ✅ Coloque lógica de componentes em `components/`
5. ✅ Coloque páginas completas em `pages/`
6. ✅ Reutilize os serviços em toda a aplicação

---

## ❓ Troubleshooting

### Erro: "Cannot find module"

```typescript
// Verificar tsconfig.json para paths
// Usar imports corretos:
import { pessoaService } from "@/services";
```

### CORS Bloqueando

```
Backend já possui CORS configurado
Se o erro persista, verifique Program.cs
```

### API não responde

```bash
# Verificar se backend está rodando
cd ../ControleGastos.Api
dotnet run

# Porta esperada: http://localhost:5012
```

---

## ✅ Status da Implementação

- ✅ Projeto Vite + React + TypeScript criado
- ✅ Axios configurado com baseURL correta
- ✅ React Router DOM instalado
- ✅ Estrutura de pastas organizada
- ✅ Tipos TypeScript criados
- ✅ Serviços de Pessoa criados
- ✅ Serviços de Categoria criados
- ✅ Serviços de Transação criados (com tratamento de erros)
- ✅ Serviços de Relatório criados
- ✅ Exportação centralizada de serviços
- ✅ Pronto para criar componentes e páginas

---

## 📚 Recursos

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Axios Docs](https://axios-http.com)
- [React Router Docs](https://reactrouter.com)
