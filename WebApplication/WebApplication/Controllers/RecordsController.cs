using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Auth;
using WebApplication.Domain;
using WebApplication.DTOs;

namespace WebApplication.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class RecordsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public RecordsController(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateRecord([FromBody] RecordCreateDto recordCreateDto)
        {
            var userId = User.GetId();
            var record = _mapper.Map<Record>(recordCreateDto);
            record.OwnerId = userId;
            await _context.Records.AddAsync(record);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType( typeof(IEnumerable<RecordInfoDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllRecords()
        {
            var records = await _context.Records.Include(r => r.Owner).ToListAsync();
            return Ok(_mapper.Map<IEnumerable<RecordInfoDto>>(records));
        }
    }
}