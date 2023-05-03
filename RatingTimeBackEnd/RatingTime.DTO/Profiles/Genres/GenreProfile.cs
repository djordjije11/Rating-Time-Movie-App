using AutoMapper;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Genres;

namespace RatingTime.DTO.Profiles.Genres
{
    public class GenreProfile : Profile
    {
        public GenreProfile()
        {
            CreateMap<Genre, GenreInfo>();
            CreateMap<MovieGenrePost, Genre>();
        }
    }
}
