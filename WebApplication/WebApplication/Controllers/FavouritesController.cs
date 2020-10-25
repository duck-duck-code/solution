using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Domain;
using WebApplication.DTOs;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavouritesController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public FavouritesController(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddToFavourites([FromBody] FavouriteCreateDto favouriteCreateDto)
        {
            await _context.FavouriteShops.AddAsync(_mapper.Map<FavouriteShop>(favouriteCreateDto));
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{itemId:long}")]
        public async Task<IActionResult> DeleteFromFavourites(long itemId, [FromQuery] string ident)
        {
            var entity = await _context.FavouriteShops
                .Where(s => s.Id == itemId && s.Identity == ident)
                .FirstOrDefaultAsync();
            if (entity != null)
            {
                _context.FavouriteShops.Remove(entity);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FavouriteShop>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFavourites([FromQuery] string ident)
        {
            var fav = await _context.FavouriteShops.Where(s => s.Identity == ident).ToListAsync();
            return Ok(fav);
        }
    }
}