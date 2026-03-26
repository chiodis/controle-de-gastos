using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services
{
    public interface ITransacaoService
    {
        Task<Transacao> ObterPorIdAsync(int id);
        Task<IEnumerable<Transacao>> ObterTodosAsync();
        Task<Transacao> CriarAsync(Transacao transacao);
        Task<Transacao> AtualizarAsync(int id, Transacao transacao);
        Task DeletarAsync(int id);
    }
}
