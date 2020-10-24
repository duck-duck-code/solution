using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Domain;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public HistoryController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet("~/api/short_history")]
        public async Task<IActionResult> GetShortHistory([FromQuery] string ident)
        {
            var records = await _context.HistoryRecords
                .Where(r => r.Identity == ident)
                .OrderByDescending(r => r.Timestamp)
                .Take(5)
                .ToListAsync();

            return Ok(records.Select(r => r.SearchValue));
        }
        
        [HttpGet("~/api/full_history")]
        public async Task<IActionResult> GetFullHistory([FromQuery] string ident)
        {
            var records = await _context.HistoryRecords
                .Where(r => r.Identity == ident)
                .OrderByDescending(r => r.Timestamp)
                .ToListAsync();

            return Ok(records.Select(r => r.SearchValue));
        }
    }
}