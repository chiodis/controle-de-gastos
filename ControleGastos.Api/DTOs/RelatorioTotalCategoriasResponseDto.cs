namespace ControleGastos.Api.DTOs
{
    /// <summary>
    /// DTO que agrupa as informações de totais por categoria com o total geral.
    /// </summary>
    public class RelatorioTotalCategoriasResponseDto
    {
        /// <summary>
        /// Lista com o relatório detalhado de cada categoria.
        /// </summary>
        public IEnumerable<RelatorioTotalCategoriaDto> Categorias { get; set; }

        /// <summary>
        /// Totais consolidados de todas as categorias.
        /// </summary>
        public TotalGeralDto TotalGeral { get; set; }
    }
}
