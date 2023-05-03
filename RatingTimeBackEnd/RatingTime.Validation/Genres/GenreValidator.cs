using FluentValidation;
using RatingTime.Domain.Models;

namespace RatingTime.Validation.Genres
{
    public class GenreValidator : AbstractValidator<Genre>
    {
        public GenreValidator() 
        {
            RuleFor(genre => genre.Id).NotEmpty();
            RuleFor(genre => genre.Name).NotEmpty();
        }
    }
}
