using System;
using System.Net.Http;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using WebApplication.Domain;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using WebApplication.Auth;

namespace WebApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(logging =>
            {
                logging.AddConsole();
            });
            services.AddControllers();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                var jwtSecret = "SecretKey1234567890";
                
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecret)),
                    ValidIssuer = "Issuer",
                    ValidAudience = "Audience",
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    LifetimeValidator = (DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters) =>
                    {
                        if (expires == null) return false;
                        return expires?.ToUniversalTime() > DateTime.UtcNow;
                    }
                };
            });
            services.AddSwaggerDocument(document =>
            {
                document.AddSecurity("JWT", new string[0],
                    new OpenApiSecurityScheme
                    {
                        Type = OpenApiSecuritySchemeType.ApiKey,
                        Name = "Authorization",
                        In = OpenApiSecurityApiKeyLocation.Header,
                        Description = "Set bearer from login response"
                    });
            });
            services.AddIdentityCore<User>(options =>
                {
                    options.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<ApplicationContext>()
                .AddSignInManager()
                .AddDefaultTokenProviders();
            
            services.AddEntityFrameworkNpgsql().AddDbContext<ApplicationContext>();
            services.AddAutoMapper(typeof(Startup));
            services.AddSingleton<AccessTokenProvider>();

            services.AddCors(opt =>
            {
                opt.AddPolicy("AllowAll", builder =>
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("AllowAll");
            }

            app.UseOpenApi();
            app.UseSwaggerUi3();
            
            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGet("{**any}", async context =>
                {
                    Console.WriteLine($"Use static ${context.Request.Path.Value}");
                    var path = context.Request.Path.Value;
                    // path = path.EndsWith("/") ? path.Substring(0, path.Length - 1) : path;
                    var url = $"{Configuration["S3Bucket"]}{path}";
                    var client = new HttpClient();
                    var responseMessage = await client.GetAsync(url);
                    context.Response.StatusCode = (int) responseMessage.StatusCode;
                    await responseMessage.Content.CopyToAsync(context.Response.Body);
                });
            });
        }
    }
}