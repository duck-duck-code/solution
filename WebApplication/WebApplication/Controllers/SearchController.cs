using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebApplication.Domain;
using WebApplication.DTOs;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Web;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly string _gisApiKey;
        private readonly string _baseUrl = "https://catalog.api.2gis.ru/3.0/items";
        
        public SearchController(
            IConfiguration configuration,
            ApplicationContext context)
        {
            _context = context;
            _gisApiKey = configuration["GisKey"];
        }
        
        [HttpPost("categories")]
        public async Task<IActionResult> Search([FromBody] SearchDto searchDto)
        {
            var fields = new List<string>
            {
                "items.point"
            };
            var urlParams = new Dictionary<string, string>
            {
                {"q", HttpUtility.UrlEncode(searchDto.Search)},
                {"sort_point", $"{searchDto.Long.ToString(NumberFormatInfo.InvariantInfo)},{searchDto.Lat.ToString(NumberFormatInfo.InvariantInfo)}"},
                {"fields", string.Join(",", fields)},
                {"key", _gisApiKey}
            };

            var queryString = string.Join("&", urlParams.Select(e => $"{e.Key}={e.Value}"));
            var requestUrl = $"{_baseUrl}?{queryString}";
            var client = new HttpClient();
            var responseMessage = await client.GetAsync(requestUrl);
            var body = await responseMessage.Content.ReadAsStreamAsync();

            return StatusCode(
                (int) responseMessage.StatusCode,
                JsonSerializer.DeserializeAsync<JsonElement>(body));
        }
    }
}