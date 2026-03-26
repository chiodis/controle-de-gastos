using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração de Cascade Delete para Pessoa -> Transacao
            modelBuilder.Entity<Transacao>()
                .HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuração de Cascade Delete para Categoria -> Transacao (opcional)
            modelBuilder.Entity<Transacao>()
                .HasOne(t => t.Categoria)
                .WithMany(c => c.Transacoes)
                .HasForeignKey(t => t.CategoriaId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuração de decimal para Valor
            modelBuilder.Entity<Transacao>()
                .Property(t => t.Valor)
                .HasPrecision(18, 2);

            // Índices para melhor performance
            modelBuilder.Entity<Pessoa>()
                .HasIndex(p => p.Nome);

            modelBuilder.Entity<Categoria>()
                .HasIndex(c => c.Nome);
        }
    }
}
