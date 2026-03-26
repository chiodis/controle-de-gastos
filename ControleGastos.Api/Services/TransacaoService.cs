using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class TransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Transacao>> ObterTodosAsync()
            => await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .ToListAsync();

        public async Task<Transacao> ObterPorIdAsync(int id)
            => await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .FirstOrDefaultAsync(t => t.Id == id);

        public async Task<Transacao> CriarAsync(Transacao transacao)
        {
            // Validar existência de Pessoa e Categoria
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);

            if (pessoa == null)
                throw new KeyNotFoundException($"Pessoa com ID {transacao.PessoaId} não encontrada");
            if (categoria == null)
                throw new KeyNotFoundException($"Categoria com ID {transacao.CategoriaId} não encontrada");

            // Validação 1: Menor de idade NÃO pode ter Receita
            var idade = CalcularIdade(pessoa.DataCriacao);
            if (idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                throw new InvalidOperationException($"Pessoa com {idade} anos não pode registrar Receita");

            // Validação 2: Tipo deve ser compatível com Finalidade da Categoria
            if (!ValidarCompatibilidade(transacao.Tipo, categoria.Finalidade))
                throw new InvalidOperationException($"Categoria '{categoria.Nome}' não é compatível com {transacao.Tipo}");

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            return transacao;
        }

        public async Task<Transacao> AtualizarAsync(int id, Transacao transacao)
        {
            var existente = await _context.Transacoes.FindAsync(id);
            if (existente == null)
                throw new KeyNotFoundException($"Transação com ID {id} não encontrada");

            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);

            if (pessoa == null)
                throw new KeyNotFoundException($"Pessoa com ID {transacao.PessoaId} não encontrada");
            if (categoria == null)
                throw new KeyNotFoundException($"Categoria com ID {transacao.CategoriaId} não encontrada");

            // Validação 1: Menor de idade NÃO pode ter Receita
            var idade = CalcularIdade(pessoa.DataCriacao);
            if (idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                throw new InvalidOperationException($"Pessoa com {idade} anos não pode registrar Receita");

            // Validação 2: Tipo deve ser compatível com Finalidade da Categoria
            if (!ValidarCompatibilidade(transacao.Tipo, categoria.Finalidade))
                throw new InvalidOperationException($"Categoria '{categoria.Nome}' não é compatível com {transacao.Tipo}");

            existente.Descricao = transacao.Descricao;
            existente.Valor = transacao.Valor;
            existente.Tipo = transacao.Tipo;
            existente.Data = transacao.Data;
            existente.PessoaId = transacao.PessoaId;
            existente.CategoriaId = transacao.CategoriaId;

            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task DeletarAsync(int id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
                throw new KeyNotFoundException($"Transação com ID {id} não encontrada");

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();
        }

        // Calcula idade baseada em DataCriacao
        private int CalcularIdade(DateTime dataCriacao)
        {
            var hoje = DateTime.UtcNow;
            var idade = hoje.Year - dataCriacao.Year;
            if (dataCriacao.Date > hoje.AddYears(-idade))
                idade--;
            return idade;
        }

        // Valida compatibilidade entre tipo e finalidade
        private bool ValidarCompatibilidade(TipoTransacao tipo, FinalidadeCategoria finalidade)
        {
            return (tipo, finalidade) switch
            {
                (TipoTransacao.Receita, FinalidadeCategoria.Receita) => true,
                (TipoTransacao.Receita, FinalidadeCategoria.Ambas) => true,
                (TipoTransacao.Despesa, FinalidadeCategoria.Despesa) => true,
                (TipoTransacao.Despesa, FinalidadeCategoria.Ambas) => true,
                _ => false
            };
        }
    }
}
