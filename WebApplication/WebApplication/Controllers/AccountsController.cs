using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Auth;
using WebApplication.Domain;
using WebApplication.DTOs;
using WebApplication.Errors;

namespace WebApplication.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly AccessTokenProvider _tokenProvider;

        public AccountsController(
            ApplicationContext context,
            SignInManager<User> signInManager, 
            UserManager<User> userManager,
            IMapper mapper,
            AccessTokenProvider tokenProvider)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenProvider = tokenProvider;
        }
        
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<UserInfoDto>> CreateUser([FromBody] UserCreateDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var result = await _userManager.CreateAsync(user, userDto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);
            
            return Ok(_mapper.Map<UserInfoDto>(user));
        }
        
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("login")]
        public async Task<ActionResult<TokenDto>> Login([FromBody] UserLoginDto userDto)
        {
            var user = await _userManager.FindByEmailAsync(userDto.Email);
            if (user == null)
                return StatusCode(StatusCodes.Status403Forbidden, 
                    new []
                    {
                        new ErrorDescription{Code = "BadCredentials", Description = "Wrong login or password"}
                    });
            
            var result = await _signInManager.CheckPasswordSignInAsync(
                user, userDto.Password, false);

            if (!result.Succeeded) 
                return StatusCode(StatusCodes.Status403Forbidden, 
                    new []
                    {
                        new ErrorDescription{Code = "BadCredentials", Description = "Wrong login or password"}
                    });
            
            return Ok(new TokenDto
            {
                Token = _tokenProvider.GenerateJwtToken(user)
            });
        }
    }
}