using System.ComponentModel.DataAnnotations;

namespace WebApplication.DTOs
{
    public class UserBaseDto
    {
        [Required] public string UserName { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
    }
    public class UserCreateDto : UserBaseDto
    {
        [Required] public string Password { get; set; }
    }

    public class UserInfoDto : UserBaseDto
    {
        [Required] public long Id { get; set; }
    }

    public class UserLoginDto
    {
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}