namespace ControleGastos.Api.DTOs
{
    public class RelatorioTotalCategoriasResponseDto
    {
        public IEnumerable<RelatorioTotalCategoriaDto> Categorias { get; set; }
        public TotalGeralDto TotalGeral { get; set; }
    }
}
