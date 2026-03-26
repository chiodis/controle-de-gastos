# 🧪 Cenários de Teste - Controle de Gastos

## Guia Completo para Testar a Aplicação

---

## 📋 Setup Inicial

Seguir o QUICK_START.md:

```bash
# Terminal 1 - Backend
cd ControleGastos.Api
dotnet run
# Deve rodar em http://localhost:5227

# Terminal 2 - Frontend
cd front-end
npm run dev
# Deve rodar em http://localhost:5173
```

---

## ✅ Fluxo Principal (Happy Path)

### Cenário 1: Fluxo Completo de Gastos

#### Passo 1: Criar Pessoa

1. Ir para **Menu → Pessoas**
2. Clicar em **Novo**
3. Preencher:
   - Nome: "João Silva"
   - Descrição: "Freelancer"
4. Clicar em **Salvar**
   - ✅ Deve voltar pra lista e mostrar a pessoa criada

#### Passo 2: Criar Categorias

1. Ir para **Menu → Categorias**
2. Criar categoria 1:
   - Nome: "Salário"
   - Finalidade: "Receita"
   - Salvar
3. Criar categoria 2:
   - Nome: "Alimentação"
   - Finalidade: "Despesa"
   - Salvar
4. Criar categoria 3:
   - Nome: "Investimento"
   - Finalidade: "Ambas"
   - Salvar
   - ✅ Deve mostrar todas as 3 categorias na lista

#### Passo 3: Criar Transações

1. Ir para **Menu → Transações**
2. Clicar em **Nova**
3. Transação 1 (Receita):
   - Pessoa: "João Silva"
   - Categoria: "Salário"
   - Tipo: "Receita"
   - Descrição: "Salário Fevereiro"
   - Valor: 3000
   - Data: (atual)
   - Salvar
   - ✅ Deve salvar com sucesso

4. Transação 2 (Despesa):
   - Pessoa: "João Silva"
   - Categoria: "Alimentação"
   - Tipo: "Despesa"
   - Descrição: "Supermercado"
   - Valor: 150
   - Salvar

5. Transação 3 (Despesa):
   - Pessoa: "João Silva"
   - Categoria: "Alimentação"
   - Tipo: "Despesa"
   - Descrição: "Restaurante"
   - Valor: 80
   - Salvar
   - ✅ Deve mostrar todas as 3 na lista

#### Passo 4: Visualizar Dashboard

1. Ir para **Menu → Dashboard**
2. Verificar:
   - ✅ "João Silva": Receitas R$ 3.000,00
   - ✅ "João Silva": Despesas R$ 230,00
   - ✅ "João Silva": Saldo R$ 2.770,00
   - ✅ Relatório por Categoria com "Salário" e "Alimentação"
   - ✅ Totais consolidados

---

## 🚨 Validações de Negócio (Edge Cases)

### Cenário 2: Validação 1 - Menor de Idade com Receita

#### Setup:

1. Criar pessoa com DataCriacao recente (menor de 18 anos)
   - Nome: "João Júnior"
   - Descrição: "Filho"
   - (Nota: A DataCriacao é setada automaticamente ao criar)

#### Teste:

1. Ir para **Transações → Nova**
2. Tentar criar transação:
   - Pessoa: "João Júnior"
   - Categoria: "Salário" (Receita)
   - Tipo: **Receita**
   - Valor: 500
3. Esperado: ❌ **ERRO** - "Pessoa com X anos não pode registrar Receita"

#### Teste Alternativo (Despesa OK):

1. Mesma pessoa "João Júnior"
2. Criar transação:
   - Tipo: **Despesa**
   - Categoria: "Alimentação"
   - Valor: 50
3. Esperado: ✅ **SUCESSO** - Despesas são permitidas

---

### Cenário 3: Validação 2 - Incompatibilidade de Categoria

#### Setup:

1. Pessoa: "João Silva" (já existe, maiores de 18)
2. Categorias já criadas

#### Teste 1: Receita com Categoria de Despesa

1. Ir para **Transações → Nova**
2. Tentar criar:
   - Pessoa: "João Silva"
   - Categoria: "Alimentação" (Finalidade: Despesa)
   - Tipo: **Receita**
   - Valor: 100
3. Esperado: ❌ **ERRO** - "Categoria não é compatível com Receita"

#### Teste 2: Despesa com Categoria de Receita

1. Tentar criar:
   - Pessoa: "João Silva"
   - Categoria: "Salário" (Finalidade: Receita)
   - Tipo: **Despesa**
   - Valor: 100
2. Esperado: ❌ **ERRO** - "Categoria não é compatível com Despesa"

#### Teste 3: Categoria "Ambas" = Sempre OK

1. Criar transação:
   - Pessoa: "João Silva"
   - Categoria: "Investimento" (Finalidade: Ambas)
   - Tipo: **Receita ou Despesa** (qualquer um)
   - Valor: 500
2. Esperado: ✅ **SEMPRE SUCESSO**

---

## 🔄 Testes CRUD Completos

### Cenário 4: Editar e Deletar

#### Editar Pessoa:

1. Ir para **Pessoas**
2. Clicar em "Editar" em "João Silva"
3. Mudar descrição para "Freelancer Experiente"
4. Salvar
5. ✅ Deve atualizar na lista

#### Deletar Pessoa:

1. Clicar em "Deletar" em qualquer pessoa
2. ✅ Deve remover da lista
3. ✅ Transações associadas também devem ser removidas (cascade delete)

#### Editar Transação:

1. Ir para **Transações**
2. Clicar em "Editar" em qualquer transação
3. Mudar valor de 150 para 175
4. Salvar
5. ✅ Dashboard deve recalcular automaticamente

---

## 🌐 Testes de API (via Postman/Insomnia)

### Base URL: `http://localhost:5227`

#### Pessoas

```
GET    /api/pessoas              - Listar todas
GET    /api/pessoas/1            - Obter por ID
POST   /api/pessoas              - Criar nova
PUT    /api/pessoas/1            - Atualizar
DELETE /api/pessoas/1            - Deletar
```

#### Categorias

```
GET    /api/categorias           - Listar todas
GET    /api/categorias/1         - Obter por ID
POST   /api/categorias           - Criar nova
PUT    /api/categorias/1         - Atualizar
DELETE /api/categorias/1         - Deletar
```

#### Transações

```
GET    /api/transacoes           - Listar todas
GET    /api/transacoes/1         - Obter por ID
POST   /api/transacoes           - Criar nova (com validações)
PUT    /api/transacoes/1         - Atualizar (com validações)
DELETE /api/transacoes/1         - Deletar
```

#### Relatórios

```
GET    /api/relatorios/por-pessoa      - Totais por pessoa + geral
GET    /api/relatorios/por-categoria   - Totais por categoria + geral
```

### Exemplo de POST - Criar Pessoa:

```json
POST /api/pessoas
Content-Type: application/json

{
  "nome": "Maria Santos",
  "descricao": "Contadora"
}
```

### Exemplo de POST - Criar Transação:

```json
POST /api/transacoes
Content-Type: application/json

{
  "descricao": "Bônus",
  "valor": 1000,
  "tipo": 1,
  "data": "2026-03-26T00:00:00Z",
  "pessoaId": 1,
  "categoriaId": 1
}
```

---

## 📊 Testes de Dashboard

### Verificações Esperadas:

1. **Relatório por Pessoa** deve mostrar:
   - ID, Nome
   - Total de Receitas
   - Total de Despesas
   - Saldo (Receitas - Despesas)
   - Quantidade de Transações
   - Total Geral consolidado

2. **Relatório por Categoria** deve mostrar:
   - ID, Nome
   - Finalidade (Despesa/Receita/Ambas)
   - Total de Receitas
   - Total de Despesas
   - Saldo
   - Quantidade de Transações

3. **Cálculos Corretos**:
   - Se João tem Receita de 3000 e Despesa de 230: Saldo = 2770 ✅
   - Se deletar pessoa, transações desaparecem ✅

---

## 🎨 Testes de UX/Interface

### Verificações:

1. ✅ Menu funciona e navega entre páginas
2. ✅ Formulários têm campos obrigatórios
3. ✅ Mensagens de erro aparecem ao fazer erro
4. ✅ Lista vazia mostra mensagem "Nenhum registro"
5. ✅ Botões Edit/Delete funcionam
6. ✅ Volta para lista após salvar
7. ✅ Dados aparecem formatados corretamente

---

## 🔍 Possíveis Problemas que Recrutador Pode Encontrar

### Se o Backend Não Iniciar:

```bash
# Erro: Port 5227 already in use
Get-Process | Where-Object {$_.Port -eq 5227} | Stop-Process -Force
```

### Se o Frontend Não Conectar:

- Backend está rodando em localhost:5227?
- Verificar console do navegador (F12) para erros
- URL do Backend em `src/services/api.ts` está correta?

### If Dados Não Aparecem:

- Banco de dados SQLite foi criado? (ControleGastos.db)
- Backend rodando? (ver console)
- Frontend conectado? (Network tab no DevTools)

---

## ✨ Pontos Que Mostram Qualidade do Código

1. **Validações de Negócio Implementadas** ✅
   - Menor de idade não pode ter receita
   - Categoria compatível com tipo

2. **Relacionamentos do Banco** ✅
   - Cascade delete funciona
   - Integridade referencial

3. **Error Handling** ✅
   - Mensagens de erro claras
   - Tratamento de exceções

4. **TypeScript** ✅
   - Tipos bem definidos
   - Sem `any` desnecessário

5. **Padrão de Services** ✅
   - Lógica isolada
   - Fácil de testar

6. **Clean Code** ✅
   - Sem comentários desnecessários
   - Nomes descritivos
   - Código legível

---

## 📝 Checklist Final do Recrutador

- [ ] Projeto clona e sobe sem erros
- [ ] Backend roda em 5227
- [ ] Frontend roda em 5173
- [ ] Pode criar Pessoa
- [ ] Pode criar Categoria
- [ ] Pode criar Transação
- [ ] Validações funcionam (menor de idade, categoria)
- [ ] Dashboard calcula corretamente
- [ ] Edit/Delete funcionam
- [ ] API responde corretamente
- [ ] Código é legível e bem estruturado
- [ ] Não parece ter sido gerado por IA

---

**Se tudo passar neste checklist, você mostrou competência de Junior Developer! 🚀**
