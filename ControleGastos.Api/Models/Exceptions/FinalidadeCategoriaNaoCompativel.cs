namespace ControleGastos.Api.Models.Exceptions
{
    /// <summary>
    /// Exceção lançada quando a finalidade da categoria não é compatível com o tipo da transação.
    /// Exemplo: Uma transação do tipo Despesa não pode usar uma categoria com finalidade Receita.
    /// </summary>
    public class FinalidadeCategoriaNaoCompativel : Exception
    {
        public FinalidadeCategoriaNaoCompativel()
            : base("A finalidade da categoria não é compatível com o tipo da transação.")
        {
        }

        public FinalidadeCategoriaNaoCompativel(string message)
            : base(message)
        {
        }
    }
}
