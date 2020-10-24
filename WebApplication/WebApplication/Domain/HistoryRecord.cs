using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication.Domain
{
    public class HistoryRecord
    {
        public long Id { get; set; }
        [Required] public string SearchValue { get; set; }
        [Required] public string Identity { get; set; }

        private DateTime? timestamp = null;
        [Required]
        public DateTime Timestamp
        {
            get => timestamp ?? DateTime.Now;
            set => timestamp = value;
        }
    }
}