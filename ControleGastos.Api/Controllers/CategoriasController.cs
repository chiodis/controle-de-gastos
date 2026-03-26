using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Models;
using ControleGastos.Api.Services;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly CategoriaService _service;

        public CategoriasController(CategoriaService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetAll()
            => Ok(await _service.ObterTodosAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetById(int id)
        {
            var categoria = await _service.ObterPorIdAsync(id);
            return categoria == null ? NotFound() : Ok(categoria);
        }

        [HttpPost]
        public async Task<ActionResult<Categoria>> Create([FromBody] Categoria categoria)
        {
            var criada = await _service.CriarAsync(categoria);
            return CreatedAtAction(nameof(GetById), new { id = criada.Id }, criada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Categoria categoria)
        {
            try
            {
                var atualizada = await _service.AtualizarAsync(id, categoria);
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
