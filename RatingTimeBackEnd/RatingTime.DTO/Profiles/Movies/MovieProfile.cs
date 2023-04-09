using AutoMapper;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Movies;

namespace RatingTime.DTO.Profiles.Movies
{
    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<Movie, MovieInfo>();
        }
    }
}
