namespace ControleGastos.Api.DTOs
{
    /// <summary>
    /// DTO que contém o total geral de todas as pessoas.
    /// </summary>
    public class TotalGeralDto
    {
        /// <summary>
        /// Soma de todas as receitas de todas as pessoas.
        /// </summary>
        public decimal TotalReceitasGeral { get; set; }

        /// <summary>
        /// Soma de todas as despesas de todas as pessoas.
        /// </summary>
        public decimal TotalDespesasGeral { get; set; }

        /// <summary>
        /// Saldo líquido geral (TotalReceitasGeral - TotalDespesasGeral).
        /// </summary>
        public decimal SaldoGeral { get; set; }

        /// <summary>
        /// Quantidade total de transações de todas as pessoas.
        /// </summary>
        public int TotalTransacoesGeral { get; set; }

        /// <summary>
        /// Quantidade total de pessoas com transações.
        /// </summary>
        public int TotalPessoas { get; set; }
    }
}
