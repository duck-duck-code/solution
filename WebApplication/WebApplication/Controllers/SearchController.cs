using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebApplication.Domain;
using WebApplication.DTOs;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Web;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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
            var record = new HistoryRecord
            {
                Identity = searchDto.Identity,
                SearchValue = searchDto.Search
            };
            await _context.HistoryRecords.AddAsync(record);
            await _context.SaveChangesAsync();
            
            var fields = new List<string>
            {
                "items.point"
            };
            
            var urlParams = new Dictionary<string, string>
            {
                {"q", HttpUtility.UrlEncode(searchDto.Search)},
                {"sort_point", $"{searchDto.Long.ToString(NumberFormatInfo.InvariantInfo)},{searchDto.Lat.ToString(NumberFormatInfo.InvariantInfo)}"},
                {"fields", string.Join(",", fields)},
                {"type", "branch"},
                {"key", _gisApiKey}
            };
            var client = new HttpClient();

            var responses = new List<HttpResponseMessage>();
            for (var p = 1; p <= 5; p++)
            {
                var responseMessage = await FetchPage(client, urlParams, p);
                if (responseMessage.StatusCode != HttpStatusCode.OK)
                    break;
                responses.Add(responseMessage);
            }

            if (responses.Count == 0)
                return Ok(
                    new
                    {
                        Result = new
                        {
                            Items = new string[0]
                        }
                    });
            
            DefaultContractResolver contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            };
            
            var favNames = await _context.FavouriteShops
                .Where(f => f.Identity == searchDto.Identity)
                .Select(f => f.ShopName)
                .ToListAsync();

            var items = responses
                .Select(r => r.Content.ReadAsStringAsync().Result)
                .Select(s =>
                {
                    var r = JsonConvert.DeserializeObject<ResponseDto>(s, new JsonSerializerSettings
                    {
                        ContractResolver = contractResolver
                    });
                    return r;
                })
                .SelectMany(r => r.Result?.Items ?? new Item[0])
                .Where(i => InFavourites(i.Name, favNames));
            
            return Ok(new
            {
                Result = new
                {
                    Items = items
                }
            });
        }

        private bool InFavourites(string name, List<string> favNames)
        {
            return favNames.Any(f => name.Contains(f, StringComparison.OrdinalIgnoreCase));
        }
        
        private async Task<HttpResponseMessage> FetchPage(HttpClient client, Dictionary<string, string> urlParams, int pageNum)
        {
            urlParams["page"] = pageNum.ToString();
            var queryString = string.Join("&", urlParams.Select(e => $"{e.Key}={e.Value}"));
            var requestUrl = $"{_baseUrl}?{queryString}";
            
            return await client.GetAsync(requestUrl);
        }
        
        public static double Calculate(float sLatitude,float sLongitude, float eLatitude, 
            float eLongitude)
        {
            var radiansOverDegrees = (Math.PI / 180.0);

            var sLatitudeRadians = sLatitude * radiansOverDegrees;
            var sLongitudeRadians = sLongitude * radiansOverDegrees;
            var eLatitudeRadians = eLatitude * radiansOverDegrees;
            var eLongitudeRadians = eLongitude * radiansOverDegrees;

            var dLongitude = eLongitudeRadians - sLongitudeRadians;
            var dLatitude = eLatitudeRadians - sLatitudeRadians;

            var result1 = Math.Pow(Math.Sin(dLatitude / 2.0), 2.0) + 
                          Math.Cos(sLatitudeRadians) * Math.Cos(eLatitudeRadians) * 
                          Math.Pow(Math.Sin(dLongitude / 2.0), 2.0);
            
            var result2 = 3956.0 * 2.0 * Math.Atan2(Math.Sqrt(result1), Math.Sqrt(1.0 - result1));

            return result2 / 1.609344;
        }
    }
}