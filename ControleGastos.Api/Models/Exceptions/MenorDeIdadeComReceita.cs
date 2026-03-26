namespace ControleGastos.Api.Models.Exceptions
{
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
