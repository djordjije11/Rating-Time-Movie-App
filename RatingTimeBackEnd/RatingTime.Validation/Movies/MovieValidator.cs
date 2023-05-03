using FluentValidation;
using RatingTime.Domain.Models;
using RatingTime.Validation.Genres;

namespace RatingTime.Validation.Movies
{
    public class MovieValidator : AbstractValidator<Movie>
    {
        public MovieValidator(GenreValidator genreValidator) 
        {
            RuleFor(movie => movie.Id).NotEmpty();
            RuleFor(movie => movie.Title).NotEmpty();
        }
    }
}
