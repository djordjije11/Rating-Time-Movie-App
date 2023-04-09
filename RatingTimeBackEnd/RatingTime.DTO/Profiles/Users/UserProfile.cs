using AutoMapper;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Users;

namespace RatingTime.DTO.Profiles.Users
{
    public class UserProfile : Profile
    {
        public UserProfile() 
        {
            CreateMap<UserLogin, User>();
            CreateMap<UserRegister, User>();
            CreateMap<User, UserInfo>();
            CreateMap<User, UserDetailInfo>();
        }
    }    
}
