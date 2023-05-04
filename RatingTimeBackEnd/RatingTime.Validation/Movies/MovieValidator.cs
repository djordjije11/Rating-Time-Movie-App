using FluentValidation;
using RatingTime.Domain.Models;

namespace RatingTime.Validation.Movies
{
    public class MovieValidator : AbstractValidator<Movie>
    {
        public MovieValidator() 
        {
            RuleFor(movie => movie.Id).NotEmpty();
            RuleFor(movie => movie.Title).NotEmpty();
        }
    }
}
