namespace ControleGastos.Api.DTOs
{
    /// <summary>
    /// DTO que representa o relatório de totais por Pessoa.
    /// </summary>
    public class RelatorioTotalPessoaDto
    {
        /// <summary>
        /// Identificador único da pessoa.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nome da pessoa.
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Total de todas as receitas registradas pela pessoa.
        /// </summary>
        public decimal TotalReceitas { get; set; }

        /// <summary>
        /// Total de todas as despesas registradas pela pessoa.
        /// </summary>
        public decimal TotalDespesas { get; set; }

        /// <summary>
        /// Saldo líquido da pessoa (TotalReceitas - TotalDespesas).
        /// Positivo = pessoa no azul, Negativo = pessoa no vermelho.
        /// </summary>
        public decimal Saldo { get; set; }

        /// <summary>
        /// Quantidade de transações registradas pela pessoa.
        /// </summary>
        public int TotalTransacoes { get; set; }
    }
}
