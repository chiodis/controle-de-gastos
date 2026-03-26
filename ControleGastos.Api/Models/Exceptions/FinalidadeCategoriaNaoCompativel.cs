namespace ControleGastos.Api.Models.Exceptions
{
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
