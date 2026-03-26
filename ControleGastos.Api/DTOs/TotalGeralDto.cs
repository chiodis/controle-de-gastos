namespace ControleGastos.Api.DTOs
{
    public class TotalGeralDto
    {
        public decimal TotalReceitasGeral { get; set; }
        public decimal TotalDespesasGeral { get; set; }
        public decimal SaldoGeral { get; set; }
        public int TotalTransacoesGeral { get; set; }
        public int TotalPessoas { get; set; }
    }
}
