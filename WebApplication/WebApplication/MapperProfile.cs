using AutoMapper;
using WebApplication.Domain;
using WebApplication.DTOs;

namespace WebApplication
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<UserCreateDto, User>();
            CreateMap<User, UserInfoDto>();
            CreateMap<FavouriteCreateDto, FavouriteShop>();
        }
    }
}