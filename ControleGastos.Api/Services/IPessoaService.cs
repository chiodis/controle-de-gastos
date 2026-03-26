using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services
{
    /// <summary>
    /// Interface que define os contratos para operações de Pessoa.
    /// </summary>
    public interface IPessoaService
    {
        /// <summary>
        /// Obtém uma pessoa pelo ID.
        /// </summary>
        /// <param name="id">ID da pessoa</param>
        /// <returns>Pessoa encontrada ou null</returns>
        Task<Pessoa> ObterPorIdAsync(int id);

        /// <summary>
        /// Obtém todas as pessoas.
        /// </summary>
        /// <returns>Lista de pessoas</returns>
        Task<IEnumerable<Pessoa>> ObterTodosAsync();

        /// <summary>
        /// Cria uma nova pessoa.
        /// </summary>
        /// <param name="pessoa">Dados da pessoa a ser criada</param>
        /// <returns>Pessoa criada</returns>
        Task<Pessoa> CriarAsync(Pessoa pessoa);

        /// <summary>
        /// Atualiza uma pessoa existente.
        /// </summary>
        /// <param name="id">ID da pessoa</param>
        /// <param name="pessoa">Novos dados da pessoa</param>
        /// <returns>Pessoa atualizada</returns>
        Task<Pessoa> AtualizarAsync(int id, Pessoa pessoa);

        /// <summary>
        /// Deleta uma pessoa pelo ID.
        /// </summary>
        /// <param name="id">ID da pessoa</param>
        Task DeletarAsync(int id);
    }
}
