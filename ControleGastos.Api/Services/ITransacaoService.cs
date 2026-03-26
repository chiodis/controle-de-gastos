using ControleGastos.Api.Models;

namespace ControleGastos.Api.Services
{
    /// <summary>
    /// Interface que define os contratos para operações de Transação.
    /// Inclui validações de regras de negócio específicas.
    /// </summary>
    public interface ITransacaoService
    {
        /// <summary>
        /// Obtém uma transação pelo ID.
        /// </summary>
        /// <param name="id">ID da transação</param>
        /// <returns>Transação encontrada ou null</returns>
        Task<Transacao> ObterPorIdAsync(int id);

        /// <summary>
        /// Obtém todas as transações.
        /// </summary>
        /// <returns>Lista de transações</returns>
        Task<IEnumerable<Transacao>> ObterTodosAsync();

        /// <summary>
        /// Cria uma nova transação com validações de regras de negócio.
        /// 
        /// Validações aplicadas:
        /// 1. Regra de Menor de Idade: Menores de 18 anos só podem registrar transações do tipo Despesa
        /// 2. Regra de Finalidade da Categoria: A finalidade da categoria deve ser compatível com o tipo da transação
        /// </summary>
        /// <param name="transacao">Dados da transação a ser criada</param>
        /// <returns>Transação criada</returns>
        /// <exception cref="Models.Exceptions.MenorDeIdadeComReceita">Lançada quando menor de idade tenta registrar Receita</exception>
        /// <exception cref="Models.Exceptions.FinalidadeCategoriaNaoCompativel">Lançada quando a finalidade da categoria não é compatível com o tipo da transação</exception>
        Task<Transacao> CriarAsync(Transacao transacao);

        /// <summary>
        /// Atualiza uma transação existente com validações de regras de negócio.
        /// </summary>
        /// <param name="id">ID da transação</param>
        /// <param name="transacao">Novos dados da transação</param>
        /// <returns>Transação atualizada</returns>
        /// <exception cref="Models.Exceptions.MenorDeIdadeComReceita">Lançada quando menor de idade tenta registrar Receita</exception>
        /// <exception cref="Models.Exceptions.FinalidadeCategoriaNaoCompativel">Lançada quando a finalidade da categoria não é compatível com o tipo da transação</exception>
        Task<Transacao> AtualizarAsync(int id, Transacao transacao);

        /// <summary>
        /// Deleta uma transação pelo ID.
        /// </summary>
        /// <param name="id">ID da transação</param>
        Task DeletarAsync(int id);
    }
}
