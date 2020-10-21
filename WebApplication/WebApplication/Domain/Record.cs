using System.ComponentModel.DataAnnotations;

namespace WebApplication.Domain
{
    public class Record
    {
        public long Id { get; set; }
        [Required]
        public string Value { get; set; }
        [Required]
        public long OwnerId { get; set; }
        [Required]
        public User Owner { get; set; }
    }
}