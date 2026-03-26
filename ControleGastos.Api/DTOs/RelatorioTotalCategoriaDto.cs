namespace ControleGastos.Api.DTOs
{
    /// <summary>
    /// DTO que representa o relatório de totais por Categoria.
    /// </summary>
    public class RelatorioTotalCategoriaDto
    {
        /// <summary>
        /// Identificador único da categoria.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nome da categoria.
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Finalidade da categoria (Despesa, Receita, Ambas).
        /// </summary>
        public string Finalidade { get; set; }

        /// <summary>
        /// Total de receitas na categoria.
        /// </summary>
        public decimal TotalReceitas { get; set; }

        /// <summary>
        /// Total de despesas na categoria.
        /// </summary>
        public decimal TotalDespesas { get; set; }

        /// <summary>
        /// Saldo líquido da categoria (TotalReceitas - TotalDespesas).
        /// </summary>
        public decimal Saldo { get; set; }

        /// <summary>
        /// Quantidade de transações na categoria.
        /// </summary>
        public int TotalTransacoes { get; set; }
    }
}
