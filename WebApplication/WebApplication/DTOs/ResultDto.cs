using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json.Linq;

namespace WebApplication.DTOs
{
    public class ResponseDto
    {
        public ResultDto Result { get; set; }
    }

    public class ResultDto
    {
        public IEnumerable<Item> Items { get; set; }
    }

    public class Item
    {
        public string AddressName { get; set; }
        public string Name { get; set; }
        public JObject Point { get; set; }
        public bool IsFavourite { get; set; }
    }
}