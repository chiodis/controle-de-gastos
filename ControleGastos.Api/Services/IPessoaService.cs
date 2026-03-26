using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services
{
    public interface IPessoaService
    {
        Task<Pessoa> ObterPorIdAsync(int id);
        Task<IEnumerable<Pessoa>> ObterTodosAsync();
        Task<Pessoa> CriarAsync(Pessoa pessoa);
        Task<Pessoa> AtualizarAsync(int id, Pessoa pessoa);
        Task DeletarAsync(int id);
    }
}
