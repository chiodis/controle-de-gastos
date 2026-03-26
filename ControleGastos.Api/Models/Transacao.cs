using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.Api.Models
{
    public class Transacao
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Descrição é obrigatória")]
        [StringLength(400)]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Valor é obrigatório")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "Tipo de transação é obrigatório")]
        public TipoTransacao Tipo { get; set; }

        public DateTime Data { get; set; } = DateTime.UtcNow;

        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Pessoa é obrigatória")]
        [ForeignKey("Pessoa")]
        public int PessoaId { get; set; }

        [Required(ErrorMessage = "Categoria é obrigatória")]
        [ForeignKey("Categoria")]
        public int CategoriaId { get; set; }

        public Pessoa Pessoa { get; set; }
        public Categoria Categoria { get; set; }
    }
}
