using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services
{
    public interface ICategoriaService
    {
        Task<Categoria> ObterPorIdAsync(int id);
        Task<IEnumerable<Categoria>> ObterTodosAsync();
        Task<Categoria> CriarAsync(Categoria categoria);
        Task<Categoria> AtualizarAsync(int id, Categoria categoria);
        Task DeletarAsync(int id);
    }
}
