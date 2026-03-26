using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class CategoriaService
    {
        private readonly AppDbContext _context;

        public CategoriaService(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Categoria>> ObterTodosAsync()
            => await _context.Categorias.ToListAsync();

        public async Task<Categoria> ObterPorIdAsync(int id)
            => await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id);

        public async Task<Categoria> CriarAsync(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<Categoria> AtualizarAsync(int id, Categoria categoria)
        {
            var existente = await _context.Categorias.FindAsync(id);
            if (existente == null)
                throw new KeyNotFoundException($"Categoria com ID {id} não encontrada");

            existente.Nome = categoria.Nome;
            existente.Descricao = categoria.Descricao;
            existente.Finalidade = categoria.Finalidade;
            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task DeletarAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
                throw new KeyNotFoundException($"Categoria com ID {id} não encontrada");

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
        }
    }
}
