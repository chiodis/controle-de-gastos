namespace ControleGastos.Api.Models.Exceptions
{
    /// <summary>
    /// Exceção lançada quando um menor de idade tenta registrar uma transação do tipo Receita.
    /// Menores de idade só podem registrar transações do tipo Despesa.
    /// </summary>
    public class MenorDeIdadeComReceita : Exception
    {
        public MenorDeIdadeComReceita()
            : base("Menores de idade só podem registrar transações do tipo Despesa. Receitas não são permitidas para pessoas com menos de 18 anos.")
        {
        }

        public MenorDeIdadeComReceita(string message)
            : base(message)
        {
        }
    }
}
