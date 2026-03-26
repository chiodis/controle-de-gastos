using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Data;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RelatoriosController(AppDbContext context) => _context = context;

        [HttpGet("totais-por-pessoa")]
        public async Task<IActionResult> GetTotalsPorPessoa()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var itens = pessoas.Select(p =>
            {
                var receitas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
                var despesas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);
                return new
                {
                    nome = p.Nome,
                    totalReceitas = receitas,
                    totalDespesas = despesas,
                    saldo = receitas - despesas,
                    totalTransacoes = p.Transacoes.Count
                };
            }).ToList();

            var totalGeral = new
            {
                totalReceitas = itens.Sum(x => (decimal)x.totalReceitas),
                totalDespesas = itens.Sum(x => (decimal)x.totalDespesas),
                saldo = itens.Sum(x => (decimal)x.saldo),
                totalTransacoes = itens.Sum(x => x.totalTransacoes)
            };

            return Ok(new { itens, totalGeral });
        }

        [HttpGet("totais-por-categoria")]
        public async Task<IActionResult> GetTotalsPorCategoria()
        {
            var categorias = await _context.Categorias
                .Include(c => c.Transacoes)
                .ToListAsync();

            var itens = categorias.Select(c =>
            {
                var receitas = c.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
                var despesas = c.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);
                return new
                {
                    nome = c.Nome,
                    totalReceitas = receitas,
                    totalDespesas = despesas,
                    saldo = receitas - despesas,
                    totalTransacoes = c.Transacoes.Count
                };
            }).ToList();

            var totalGeral = new
            {
                totalReceitas = itens.Sum(x => (decimal)x.totalReceitas),
                totalDespesas = itens.Sum(x => (decimal)x.totalDespesas),
                saldo = itens.Sum(x => (decimal)x.saldo),
                totalTransacoes = itens.Sum(x => x.totalTransacoes)
            };

            return Ok(new { itens, totalGeral });
        }
    }
}
