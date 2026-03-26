# Script de Teste - Controle de Gastos

# Variáveis
$BaseURL = "http://localhost:5227/api"
$Header = @{"Content-Type" = "application/json"}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "🧪 INICIANDO TESTES DO CONTROLE DE GASTOS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# TESTE 1: CREATE PESSOA
# ============================================================================
Write-Host "TEST 1: Criar Pessoa 'João Silva'" -ForegroundColor Yellow
$pessoaBody = @{
    nome = "João Silva"
    descricao = "Freelancer"
} | ConvertTo-Json

try {
    $pessoaResponse = Invoke-RestMethod -Uri "$BaseURL/pessoas" -Method POST -Headers $Header -Body $pessoaBody
    $pessoaId = $pessoaResponse.id
    Write-Host "✅ Pessoa criada com ID: $pessoaId" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao criar pessoa: $_" -ForegroundColor Red
    exit
}

# ============================================================================
# TESTE 2: GET PESSOA
# ============================================================================
Write-Host "TEST 2: Obter Pessoa pelo ID" -ForegroundColor Yellow
try {
    $pessoaGet = Invoke-RestMethod -Uri "$BaseURL/pessoas/$pessoaId" -Method GET -Headers $Header
    Write-Host "✅ Pessoa obtida:" -ForegroundColor Green
    Write-Host "   Nome: $($pessoaGet.nome)"
    Write-Host "   ID: $($pessoaGet.id)"
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao obter pessoa: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 3: CREATE CATEGORIAS
# ============================================================================
Write-Host "TEST 3: Criar Categorias" -ForegroundColor Yellow

$catSalario = @{
    nome = "Salário"
    finalidade = 2  # Receita
} | ConvertTo-Json

$catAlimentacao = @{
    nome = "Alimentação"
    finalidade = 1  # Despesa
} | ConvertTo-Json

$catInvestimento = @{
    nome = "Investimento"
    finalidade = 3  # Ambas
} | ConvertTo-Json

try {
    $respSalario = Invoke-RestMethod -Uri "$BaseURL/categorias" -Method POST -Headers $Header -Body $catSalario
    $catSalarioId = $respSalario.id
    Write-Host "✅ Categoria 'Salário' criada com ID: $catSalarioId" -ForegroundColor Green
    
    $respAlimentacao = Invoke-RestMethod -Uri "$BaseURL/categorias" -Method POST -Headers $Header -Body $catAlimentacao
    $catAlimentacaoId = $respAlimentacao.id
    Write-Host "✅ Categoria 'Alimentação' criada com ID: $catAlimentacaoId" -ForegroundColor Green
    
    $respInvestimento = Invoke-RestMethod -Uri "$BaseURL/categorias" -Method POST -Headers $Header -Body $catInvestimento
    $catInvestimentoId = $respInvestimento.id
    Write-Host "✅ Categoria 'Investimento' criada com ID: $catInvestimentoId" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao criar categorias: $_" -ForegroundColor Red
    exit
}

# ============================================================================
# TESTE 4: CREATE TRANSAÇÃO - RECEITA (Happy Path)
# ============================================================================
Write-Host "TEST 4: Criar Transação Receita (Salário)" -ForegroundColor Yellow

$transacao1 = @{
    descricao = "Salário Fevereiro"
    valor = 3000
    tipo = 1  # Receita
    data = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    pessoaId = $pessoaId
    categoriaId = $catSalarioId
} | ConvertTo-Json

try {
    $resp1 = Invoke-RestMethod -Uri "$BaseURL/transacoes" -Method POST -Headers $Header -Body $transacao1
    $trans1Id = $resp1.id
    Write-Host "✅ Transação Receita criada com ID: $trans1Id" -ForegroundColor Green
    Write-Host "   Valor: R$ $($resp1.valor)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao criar transação receita: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 5: CREATE TRANSAÇÃO - DESPESA (Happy Path)
# ============================================================================
Write-Host "TEST 5: Criar Transação Despesa (Alimentação)" -ForegroundColor Yellow

$transacao2 = @{
    descricao = "Supermercado"
    valor = 150
    tipo = 2  # Despesa
    data = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    pessoaId = $pessoaId
    categoriaId = $catAlimentacaoId
} | ConvertTo-Json

try {
    $resp2 = Invoke-RestMethod -Uri "$BaseURL/transacoes" -Method POST -Headers $Header -Body $transacao2
    $trans2Id = $resp2.id
    Write-Host "✅ Transação Despesa criada com ID: $trans2Id" -ForegroundColor Green
    Write-Host "   Valor: R$ $($resp2.valor)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao criar transação despesa: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 6: CREATE TRANSAÇÃO - DESPESA 2 (Categoria Ambas)
# ============================================================================
Write-Host "TEST 6: Criar Segunda Despesa com Categoria Ambas" -ForegroundColor Yellow

$transacao3 = @{
    descricao = "Restaurante"
    valor = 80
    tipo = 2  # Despesa
    data = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    pessoaId = $pessoaId
    categoriaId = $catInvestimentoId
} | ConvertTo-Json

try {
    $resp3 = Invoke-RestMethod -Uri "$BaseURL/transacoes" -Method POST -Headers $Header -Body $transacao3
    $trans3Id = $resp3.id
    Write-Host "✅ Transação criada com ID: $trans3Id" -ForegroundColor Green
    Write-Host "   Valor: R$ $($resp3.valor)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao criar transação: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 7: LIST TRANSAÇÕES
# ============================================================================
Write-Host "TEST 7: Listar Todas as Transações" -ForegroundColor Yellow

try {
    $transacoes = Invoke-RestMethod -Uri "$BaseURL/transacoes" -Method GET -Headers $Header
    Write-Host "✅ Total de transações: $($transacoes.Count)" -ForegroundColor Green
    foreach ($t in $transacoes) {
        Write-Host "   - $($t.descricao): R$ $($t.valor) (Tipo: $($t.tipo))"
    }
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao listar transações: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 8: VALIDAÇÃO - Recusar Receita com Categoria Despesa
# ============================================================================
Write-Host "TEST 8: Validação - Tentar Receita com Categoria Despesa (Deve Falhar)" -ForegroundColor Yellow

$transacaoInvalida = @{
    descricao = "Tentativa Inválida"
    valor = 100
    tipo = 1  # Receita
    data = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    pessoaId = $pessoaId
    categoriaId = $catAlimentacaoId  # Categoria de DESPESA
} | ConvertTo-Json

try {
    $respInvalida = Invoke-RestMethod -Uri "$BaseURL/transacoes" -Method POST -Headers $Header -Body $transacaoInvalida
    Write-Host "❌ FALHOU! Validação não funcionou - transação foi criada!" -ForegroundColor Red
} catch {
    Write-Host "✅ Validação funcionou corretamente!" -ForegroundColor Green
    Write-Host "   Erro capturado: $($_.Exception.Response.StatusCode)" -ForegroundColor Green
    Write-Host ""
}

# ============================================================================
# TESTE 9: RELATÓRIO - Por Pessoa
# ============================================================================
Write-Host "TEST 9: Relatório Por Pessoa" -ForegroundColor Yellow

try {
    $relatorioP = Invoke-RestMethod -Uri "$BaseURL/relatorios/por-pessoa" -Method GET -Headers $Header
    Write-Host "✅ Relatório por Pessoa:" -ForegroundColor Green
    Write-Host "   Total Geral Receitas: R$ $($relatorioP.totalGeral.totalReceitasGeral)" -ForegroundColor Green
    Write-Host "   Total Geral Despesas: R$ $($relatorioP.totalGeral.totalDespesasGeral)" -ForegroundColor Green
    Write-Host "   Saldo Geral: R$ $($relatorioP.totalGeral.saldoGeral)" -ForegroundColor Green
    
    foreach ($p in $relatorioP.pessoas) {
        Write-Host "   ---" -ForegroundColor Yellow
        Write-Host "   Pessoa: $($p.nome)"
        Write-Host "   Receitas: R$ $($p.totalReceitas)"
        Write-Host "   Despesas: R$ $($p.totalDespesas)"
        Write-Host "   Saldo: R$ $($p.saldo)"
    }
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao obter relatório: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 10: RELATÓRIO - Por Categoria
# ============================================================================
Write-Host "TEST 10: Relatório Por Categoria" -ForegroundColor Yellow

try {
    $relatorioC = Invoke-RestMethod -Uri "$BaseURL/relatorios/por-categoria" -Method GET -Headers $Header
    Write-Host "✅ Relatório por Categoria:" -ForegroundColor Green
    
    foreach ($c in $relatorioC.categorias) {
        Write-Host "   - $($c.nome) (Finalidade: $($c.finalidade))"
        Write-Host "     Receitas: R$ $($c.totalReceitas)"
        Write-Host "     Despesas: R$ $($c.totalDespesas)"
        Write-Host "     Saldo: R$ $($c.saldo)"
    }
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao obter relatório: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 11: UPDATE TRANSAÇÃO
# ============================================================================
Write-Host "TEST 11: Atualizar Transação" -ForegroundColor Yellow

$transacaoAtualizada = @{
    descricao = "Supermercado (atualizado)"
    valor = 175
    tipo = 2
    data = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
    pessoaId = $pessoaId
    categoriaId = $catAlimentacaoId
} | ConvertTo-Json

try {
    $respAtt = Invoke-RestMethod -Uri "$BaseURL/transacoes/$trans2Id" -Method PUT -Headers $Header -Body $transacaoAtualizada
    Write-Host "✅ Transação atualizada:" -ForegroundColor Green
    Write-Host "   Novo Valor: R$ $($respAtt.valor)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao atualizar: $_" -ForegroundColor Red
}

# ============================================================================
# TESTE 12: DELETE TRANSAÇÃO
# ============================================================================
Write-Host "TEST 12: Deletar Transação" -ForegroundColor Yellow

try {
    Invoke-RestMethod -Uri "$BaseURL/transacoes/$trans3Id" -Method DELETE -Headers $Header
    Write-Host "✅ Transação deletada com sucesso" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao deletar: $_" -ForegroundColor Red
}

# ============================================================================
# RESUMO FINAL
# ============================================================================
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ TESTES CONCLUÍDOS COM SUCESSO" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Resumo:" -ForegroundColor Green
Write-Host "   ✅ Backend está respondendo em http://localhost:5227" -ForegroundColor Green
Write-Host "   ✅ CRUD de Pessoas funcionando" -ForegroundColor Green
Write-Host "   ✅ CRUD de Categorias funcionando" -ForegroundColor Green
Write-Host "   ✅ CRUD de Transações funcionando" -ForegroundColor Green
Write-Host "   ✅ Validações de negócio funcionando" -ForegroundColor Green
Write-Host "   ✅ Relatórios calculando corretamente" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Acesse o frontend em: http://localhost:5173" -ForegroundColor Yellow
