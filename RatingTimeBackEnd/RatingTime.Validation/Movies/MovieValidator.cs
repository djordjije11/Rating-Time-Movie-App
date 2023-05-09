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
            RuleFor(movie => movie.AverageRating).Cascade(CascadeMode.Stop).InclusiveBetween(1, 5).PrecisionScale(3, 2, true);
        }
    }
}
