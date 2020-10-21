using System.Security.Claims;

namespace WebApplication.Auth
{
    public static class ClaimPrincipalExtensions
    {
        public static long GetId(this ClaimsPrincipal principal)
        {
            return long.Parse(principal.FindFirstValue(ClaimTypes.NameIdentifier));
        }
    }
}