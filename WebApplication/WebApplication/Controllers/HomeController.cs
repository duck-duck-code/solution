using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;
using WebApplication.Auth;
using WebApplication.Domain;

namespace WebApplication.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public HomeController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("greeting")]
        public async Task<IActionResult> GetGreeting()
        {
            return Ok("Hello, world");
        }
        
        [HttpGet("private_greeting")]
        public async Task<IActionResult> GetPrivateGreeting()
        {
            var user = await _userManager.FindByIdAsync(User.GetId().ToString());
            
            return Ok($"Hello, {user.FirstName} {user.LastName}!");
        }
    }
}