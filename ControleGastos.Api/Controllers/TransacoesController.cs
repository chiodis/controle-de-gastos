using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Models;
using ControleGastos.Api.Services;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacoesController(TransacaoService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetAll()
            => Ok(await _service.ObterTodosAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Transacao>> GetById(int id)
        {
            var transacao = await _service.ObterPorIdAsync(id);
            return transacao == null ? NotFound() : Ok(transacao);
        }

        [HttpPost]
        public async Task<ActionResult<Transacao>> Create([FromBody] Transacao transacao)
        {
            try
            {
                var criada = await _service.CriarAsync(transacao);
                return CreatedAtAction(nameof(GetById), new { id = criada.Id }, criada);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { erro = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Transacao transacao)
        {
            try
            {
                var atualizada = await _service.AtualizarAsync(id, transacao);
                return Ok(atualizada);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeletarAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
