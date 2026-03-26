using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        [StringLength(200, MinimumLength = 1, ErrorMessage = "Nome deve ter entre 1 e 200 caracteres")]
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Nome { get; set; }

        [StringLength(400)]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Finalidade é obrigatória")]
        public FinalidadeCategoria Finalidade { get; set; }

        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        // Navegação
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
