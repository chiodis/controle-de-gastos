namespace ControleGastos.Api.DTOs
{
    public class RelatorioTotalPessoasResponseDto
    {
        public IEnumerable<RelatorioTotalPessoaDto> Pessoas { get; set; }
        public TotalGeralDto TotalGeral { get; set; }
    }
}
