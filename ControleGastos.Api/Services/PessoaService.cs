using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class PessoaService
    {
        private readonly AppDbContext _context;

        public PessoaService(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Pessoa>> ObterTodosAsync()
            => await _context.Pessoas.ToListAsync();

        public async Task<Pessoa> ObterPorIdAsync(int id)
            => await _context.Pessoas.FirstOrDefaultAsync(p => p.Id == id);

        public async Task<Pessoa> CriarAsync(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

        public async Task<Pessoa> AtualizarAsync(int id, Pessoa pessoa)
        {
            var existente = await _context.Pessoas.FindAsync(id);
            if (existente == null)
                throw new KeyNotFoundException($"Pessoa com ID {id} não encontrada");

            existente.Nome = pessoa.Nome;
            existente.Descricao = pessoa.Descricao;
            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task DeletarAsync(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null)
                throw new KeyNotFoundException($"Pessoa com ID {id} não encontrada");

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
        }
    }
}
