namespace ControleGastos.Api.DTOs
{
    public class RelatorioTotalCategoriaDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Finalidade { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
        public int TotalTransacoes { get; set; }
    }
}
