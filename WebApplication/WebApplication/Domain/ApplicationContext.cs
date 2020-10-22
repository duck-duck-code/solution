using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace WebApplication.Domain
{
    public class ApplicationContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<User> Users { get; set; }
        public DbSet<Record> Records { get; set; }

        public ApplicationContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration["ConnectionStrings:DuckDuckCodeConn"]);
        }
    }
}