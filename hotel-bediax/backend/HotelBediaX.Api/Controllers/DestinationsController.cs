// controlador REST con endpoints crud

using Microsoft.AspNetCore.Mvc;
using HotelBediaX.Api.Data;
using HotelBediaX.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBediaX.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public DestinationsController(AppDbContext db) => _db = db;

        // para hacer get
        // GET: api/destinations?pageNumber=1&pageSize=50...

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 50, [FromQuery] string? search = null, [FromQuery] string? sort = null)
        {
            if (page <= 0) page = 1;
            if (pageSize <= 0 || pageSize > 1000) pageSize = 50;

            var query = _db.Destinations.AsQueryable();
            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.ToLower();
                query = query.Where(d => d.Name.ToLower().Contains(search) || d.Country.ToLower().Contains(search) || d.City.ToLower().Contains(search));
            }

            //sorting
            query = sort switch
            {
                "priceAsc" => query.OrderBy(d => d.PricePerNight),
                "priceDesc" => query.OrderByDescending(d => d.PricePerNight),
                "createdDesc" => query.OrderByDescending(d => d.CreatedAt),
                _ => query.OrderBy(d => d.Name),
            };

            var totalItems = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(new
            {
                total = totalItems,
                page,
                pageSize,
                items
            });
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var d = await _db.Destinations.FindAsync(id);
            if (d == null) return NotFound();
            return Ok(d);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Destination dto)
        {
            dto.Id = Guid.NewGuid();
            dto.CreatedAt = DateTime.UtcNow;
            _db.Destinations.Add(dto);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = dto.Id }, dto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Destination dto)
        {
            var existing = await _db.Destinations.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = dto.Name;
            existing.Country = dto.Country;
            existing.City = dto.City;
            existing.Description = dto.Description;
            existing.PricePerNight = dto.PricePerNight;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var existing = await _db.Destinations.FindAsync(id);
            if (existing == null) return NotFound();

            _db.Destinations.Remove(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}