using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace WebApplication.Domain
{
    public class User : IdentityUser<long>
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
    }
}