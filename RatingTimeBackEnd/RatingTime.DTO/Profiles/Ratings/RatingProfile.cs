using AutoMapper;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Ratings;

namespace RatingTime.DTO.Profiles.Ratings
{
    public class RatingProfile : Profile
    {
        public RatingProfile()
        {
            CreateMap<Rating, UserRatingInfo>();
        }
    }
}
