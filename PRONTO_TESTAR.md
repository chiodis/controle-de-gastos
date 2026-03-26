# Pronto para Testar - Controle de Gastos

## Status Atual

✅ **Backend**: Rodando em http://localhost:5227
✅ **Frontend**: Rodando em http://localhost:5173  
✅ **Banco de Dados**: SQLite criado automaticamente

---

## O Que Testar Antes do Recrutador

### 1️⃣ Teste Rápido (5 minutos)

#### Criar dados básicos:

1. Ir para **Pessoas** → Criar "João Silva"
2. Ir para **Categorias** → Criar 3:
   - "Salário" (Receita)
   - "Alimentação" (Despesa)
   - "Investimento" (Ambas)
3. Ir para **Transações** → Criar:
   - Receita: "Salário" R$ 3.000
   - Despesa: "Alimentação" R$ 150
   - Despesa: "Alimentação" R$ 80
4. Verificar **Dashboard** → Deve calcular:
   - Receitas: R$ 3.000
   - Despesas: R$ 230
   - Saldo: R$ 2.770 ✅

---

### 2️⃣ Teste de Validações (5 minutos)

#### Teste 1: Recusar Receita com Categoria Despesa

1. Ir para **Transações** → Novo
2. Tentar:
   - Pessoa: "João Silva"
   - Categoria: "Alimentação" (Despesa)
   - Tipo: "Receita"
3. Esperado: ❌ **ERRO** "Categoria não é compatível com Receita"

#### Teste 2: Categoria "Ambas" sempre funciona

1. Ir para **Transações** → Novo
2. Criar:
   - Pessoa: "João Silva"
   - Categoria: "Investimento" (Ambas)
   - Tipo: "Receita"
   - Valor: 500
3. Esperado: ✅ **SUCESSO!**

---

### 3️⃣ Teste de CRUD (5 minutos)

#### Edit Transação

1. Ir para **Transações**
2. Clicar "Editar" na transação de R$ 150
3. Mudar para R$ 175
4. Salvar
5. Verificar **Dashboard** → Despesas devem ser R$ 255 (175+80)

#### Delete Transação

1. Clicar "Deletar" em uma transação
2. Deve remover e dashboard recalcular

#### Delete Pessoa

1. Ir para **Pessoas**
2. Clicar "Deletar" em "João Silva"
3. Deve remover pessoa E todas as transações (cascade delete)

---

## Documentação Disponível para Recrutador

Já pronto no repositório:

✅ **README.md** - Apresentação do projeto
✅ **QUICK_START.md** - Como rodar em 3 passos
✅ **TEST_SCENARIOS.md** - Cenários de teste detalhados
✅ **MANUAL_TEST.md** - Guia prático de teste
✅ **GitHub** - Código no `https://github.com/chiodis/controle-de-gastos`

---

## Checklist Antes de Enviar pro Recrutador

- [ ] Backend roda em 5227 sem erros
- [ ] Frontend roda em 5173 sem erros
- [ ] Pessoa criada com sucesso
- [ ] Categorias criadas com sucesso
- [ ] Transação de Receita funciona
- [ ] Transação de Despesa funciona
- [ ] Validação rejeita combinação inválida
- [ ] Dashboard calcula corretamente
- [ ] Edit de transação atualiza dashboard
- [ ] Delete funciona
- [ ] Cascade delete funciona (deletar pessoa → transações somem)
- [ ] Código parecer legítimo (sem comentários de IA)
- [ ] Git history não mostra "Remove comments" óbvio

---

## Possíveis Problemas & Soluções

### ❌ Frontend não conecta ao backend

**Solução:**

```bash
# Verificar console do navegador (F12)
# Network tab → procurar erro
# Se tiver erro CORS ou 404:
# - Backend está rodando em 5227?
# - api.ts tem URL correta?
```

### ❌ Dados não aparecem após criar

**Solução:**

```bash
# Verificar se banco SQLite foi criado
# Arquivo: ControleGastos.Api/ControleGastos.db
# Se não existir, deixar criar automaticamente ao iniciar API
```

### ❌ Erro "Pessoa não encontrada"

**Solução:**

- Certifique-se de criar Pessoa ANTES de criar Transação
- Selecionar Pessoa no combobox

### ❌ Não consegue deletar

**Solução:**

- Atualizar página (F5)
- Se persistir, reiniciar servidores

---

## Arquitetura que Recrutador vai Notar

### Backend (ASP.NET Core 9.0)

```
ControleGastos.Api/
├── Controllers/          (4 controllers simples)
├── Services/            (Lógica isolada)
├── Models/             (Entities + validações)
├── DTOs/               (Transfer objects para relatórios)
├── Data/               (EF Core context)
└── Program.cs          (Configuração simples)
```

**Boas práticas:**

- ✅ Padrão Services
- ✅ Validações na service
- ✅ Erros tratados com try-catch
- ✅ CORS configurado
- ✅ Relacionamentos com cascade delete
- ✅ Índices no banco

### Frontend (React + TypeScript)

```
front-end/src/
├── pages/              (7 components)
├── services/           (API communication)
├── types/             (Tipos TypeScript)
├── App.tsx            (Router)
└── main.tsx
```

**Boas práticas:**

- ✅ TypeScript bem tipado
- ✅ Services separadas da UI
- ✅ Tratamento de erros
- ✅ Componentes funcionais
- ✅ React Router para navegação
- ✅ Estado local com useState

---

## Scripts Úteis Para Testar

### Abrir Backend em novo terminal

```bash
cd ControleGastos.Api
dotnet run
```

### Abrir Frontend em novo terminal

```bash
cd front-end
npm run dev
```

### Acessar a app

```
http://localhost:5173
```

---

## Dicas Finais

1. **Teste tudo que criar** - Não deixe bugs óbvios
2. **Verifique os cálculos do dashboard** - Deve ser exato
3. **Teste as validações** - Mostram que entendeu regras de negócio
4. **Verifique se cascade delete funciona** - Isso impressiona
5. **Veja o código bem comentado** - Sem demais, sem de menos
6. **GitHub limpo** - Histórico natural, sem "Remove comments"

---

## Próximo Passo

1. Execute todos os testes acima ✅
2. Corrija qualquer problema encontrado
3. Commit final se necessário
4. Envie link do GitHub para recrutador
5. Deixe os 2 servidores rodando para ele testar

**Status: PRONTO PARA REVISÃO DE RECRUTADOR** 🚀
