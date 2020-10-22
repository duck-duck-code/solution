using System.ComponentModel.DataAnnotations;

namespace WebApplication.DTOs
{
    public class RecordBaseDto
    {
        [Required]
        public string Value { get; set; }
    }

    public class RecordCreateDto : RecordBaseDto
    {
    }
    
    public class RecordInfoDto : RecordBaseDto
    {
        public long Id { get; set; }
        public UserInfoDto Owner { get; set; }
    }
}