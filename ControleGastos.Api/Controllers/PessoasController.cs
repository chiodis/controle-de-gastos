using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Models;
using ControleGastos.Api.Services;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly PessoaService _service;

        public PessoasController(PessoaService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAll()
            => Ok(await _service.ObterTodosAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetById(int id)
        {
            var pessoa = await _service.ObterPorIdAsync(id);
            return pessoa == null ? NotFound() : Ok(pessoa);
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> Create([FromBody] Pessoa pessoa)
        {
            var criada = await _service.CriarAsync(pessoa);
            return CreatedAtAction(nameof(GetById), new { id = criada.Id }, criada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Pessoa pessoa)
        {
            try
            {
                var atualizada = await _service.AtualizarAsync(id, pessoa);
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
