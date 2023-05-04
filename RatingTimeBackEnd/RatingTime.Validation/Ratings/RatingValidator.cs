using FluentValidation;
using RatingTime.Domain.Models;

namespace RatingTime.Validation.Ratings
{
    public class RatingValidator : AbstractValidator<Rating>
    {
        public RatingValidator() 
        {
            RuleFor(rating => rating.UserId).NotEmpty();
            RuleFor(rating => rating.MovieId).NotEmpty();
            RuleFor(rating => rating.StarsNumber).InclusiveBetween(1, 5);
        }
    }
}
