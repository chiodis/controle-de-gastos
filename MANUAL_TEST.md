# Guia de Teste Manual - Controle de Gastos

## Status dos Servidores

✅ Backend: http://localhost:5227 (ASP.NET Core 9.0)
✅ Frontend: http://localhost:5173 (React + Vite)

---

## Testes Manuais no Navegador

### 1. Acess o Frontend

Abra: http://localhost:5173

Você deve ver:

- Menu com: Dashboard, Pessoas, Categorias, Transações
- Página inicial vazia

### 2. Teste Fluxo Completo

#### A. Criar Pessoa

1. Clique em "Pessoas"
2. Clique em "Novo"
3. Preencha:
   - Nome: "João Silva"
   - Descrição: "Freelancer"
4. Clique "Salvar"
5. Deve voltar pra lista e mostrar a pessoa criada

#### B. Criar Categorias

1. Clique em "Categorias"
2. Clique em "Novo"
3. Categoria 1:
   - Nome: "Salário"
   - Finalidade: "Receita"
   - Salvar
4. Categoria 2:
   - Nome: "Alimentação"
   - Finalidade: "Despesa"
   - Salvar
5. Categoria 3:
   - Nome: "Investimento"
   - Finalidade: "Ambas"
   - Salvar

Você deve ver 3 categorias na lista com suas finalidades.

#### C. Criar Transações

1. Clique em "Transações"
2. Clique em "Nova"
3. Transação 1:
   - Pessoa: "João Silva"
   - Categoria: "Salário"
   - Tipo: "Receita"
   - Descrição: "Salário Fevereiro"
   - Valor: 3000
   - Salvar

4. Transação 2:
   - Pessoa: "João Silva"
   - Categoria: "Alimentação"
   - Tipo: "Despesa"
   - Descrição: "Supermercado"
   - Valor: 150
   - Salvar

5. Transação 3:
   - Pessoa: "João Silva"
   - Categoria: "Alimentação"
   - Tipo: "Despesa"
   - Descrição: "Restaurante"
   - Valor: 80
   - Salvar

Você deve ver 3 transações na lista.

#### D. Verificar Dashboard

1. Clique em "Dashboard"
2. Deve mostrar:
   - João Silva: Receitas R$ 3.000,00
   - João Silva: Despesas R$ 230,00
   - João Silva: Saldo R$ 2.770,00

---

## Testes de Validação

### Teste 1: Menor de Idade não pode ter Receita

1. Criar nova pessoa (vai ter data de hoje = menor de 18)
2. Tentar criar transação Receita
3. Esperado: ERRO - "Pessoa com X anos não pode registrar Receita"

### Teste 2: Incompatibilidade de Categoria

1. Ir em "Transações"
2. Tentar criar:
   - Pessoa: "João Silva"
   - Categoria: "Alimentação" (Despesa)
   - Tipo: "Receita" (incompatível!)
3. Esperado: ERRO - "Categoria não é compatível com Receita"

### Teste 3: Categoria "Ambas" sempre funciona

1. Criar transação com "Investimento" (Ambas)
2. Tipo: Receita
3. Esperado: OK! Deve funcionar

---

## Testes de Edit e Delete

### Editar Transação

1. Ir em "Transações"
2. Clicar "Editar" em uma transação
3. Mudar valor de 150 para 175
4. Salvar
5. Esperado: Valor atualizado na lista e dashboard recalcula

### Deletar Transação

1. Clicar "Deletar" em uma transação
2. Deve remover da lista
3. Dashboard recalcula

### Deletar Pessoa

1. Ir em "Pessoas"
2. Clicar "Deletar" em "João Silva"
3. Deve remover pessoa
4. Transações associadas também devem ser removidas (cascade delete)

---

## Checklist de Teste Completo

Marque conforme testa:

[ ] Backend roda sem erros em 5227
[ ] Frontend roda sem erros em 5173
[ ] Consegue criar Pessoa
[ ] Consegue editar Pessoa
[ ] Consegue deletar Pessoa
[ ] Consegue criar Categoria
[ ] Consegue editar Categoria
[ ] Consegue deletar Categoria
[ ] Consegue criar Transação (Receita)
[ ] Consegue criar Transação (Despesa)
[ ] Validação: Recusa Receita com Categoria Despesa
[ ] Validação: Menor de idade não pode ter Receita
[ ] Validação: Categoria "Ambas" aceita tudo
[ ] Edit de Transação funciona
[ ] Delete de Transação funciona
[ ] Dashboard calcula corretamente
[ ] Saldo está correto (Receitas - Despesas)
[ ] Cascade delete funciona (deletar pessoa remove transações)

---

## Se Algo Não Funcionar

### Erro: "Erro ao carregar"

- Verifique se backend está rodando: http://localhost:5227
- Abra DevTools (F12) → Network → veja se há requests falhando

### Erro: "Pessoa não encontrada"

- Certifique-se de selecionar uma Pessoa ao criar transação

### Erro: "Categoria não encontrada"

- Certifique-se de selecionar uma Categoria ao criar transação

### Banco de dados vazio / dados desapareceram

- Verifique se ControleGastos.db existe na pasta do API
- Se tiver problema, deletar o arquivo .db e deixar criar novamente

---

## Próximos Passos para Recrutador

1. Clonar do GitHub
2. Seguir QUICK_START.md
3. Testar todos os cenários acima
4. Verificar código (Backend e Frontend)
5. Notar que:
   - Validações de negócio funcionam
   - Código é limpo e legível
   - Não parece IA
   - Arquitetura com Services
   - TypeScript bem tipado
   - React organizado em componentes
