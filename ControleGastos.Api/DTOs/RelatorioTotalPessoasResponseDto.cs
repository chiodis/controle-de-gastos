namespace ControleGastos.Api.DTOs
{
    /// <summary>
    /// DTO que agrupa as informações de totais por pessoa com o total geral.
    /// </summary>
    public class RelatorioTotalPessoasResponseDto
    {
        /// <summary>
        /// Lista com o relatório detalhado de cada pessoa.
        /// </summary>
        public IEnumerable<RelatorioTotalPessoaDto> Pessoas { get; set; }

        /// <summary>
        /// Totais consolidados de todas as pessoas.
        /// </summary>
        public TotalGeralDto TotalGeral { get; set; }
    }
}
