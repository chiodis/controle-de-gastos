using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services
{
    /// <summary>
    /// Interface que define os contratos para operações de Categoria.
    /// </summary>
    public interface ICategoriaService
    {
        /// <summary>
        /// Obtém uma categoria pelo ID.
        /// </summary>
        /// <param name="id">ID da categoria</param>
        /// <returns>Categoria encontrada ou null</returns>
        Task<Categoria> ObterPorIdAsync(int id);

        /// <summary>
        /// Obtém todas as categorias.
        /// </summary>
        /// <returns>Lista de categorias</returns>
        Task<IEnumerable<Categoria>> ObterTodosAsync();

        /// <summary>
        /// Cria uma nova categoria.
        /// </summary>
        /// <param name="categoria">Dados da categoria a ser criada</param>
        /// <returns>Categoria criada</returns>
        Task<Categoria> CriarAsync(Categoria categoria);

        /// <summary>
        /// Atualiza uma categoria existente.
        /// </summary>
        /// <param name="id">ID da categoria</param>
        /// <param name="categoria">Novos dados da categoria</param>
        /// <returns>Categoria atualizada</returns>
        Task<Categoria> AtualizarAsync(int id, Categoria categoria);

        /// <summary>
        /// Deleta uma categoria pelo ID.
        /// </summary>
        /// <param name="id">ID da categoria</param>
        Task DeletarAsync(int id);
    }
}
