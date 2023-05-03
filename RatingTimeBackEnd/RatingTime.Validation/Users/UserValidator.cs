using FluentValidation;
using RatingTime.Domain.Models;

namespace RatingTime.Validation.Users
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(u => u.Username).NotNull()
                                    .Length(3, 40);

            RuleFor(u => u.Password).Cascade(CascadeMode.Stop)
                                    .NotNull()
                                    .Length(8, 40)
                                    .Must(HaveUpperCaseCharacter)
                                    .WithMessage("'{PropertyName}' must have at least one upper case character.")
                                    .Must(HaveLowerCaseCharacter)
                                    .WithMessage("'{PropertyName}' must have at least one lower case character.")
                                    .Must(HaveDigit)
                                    .WithMessage("'{PropertyName}' must have at least one digit.");
            RuleFor(u => u.Email).NotNull()
                                 .EmailAddress();
        }

        protected bool HaveUpperCaseCharacter(string text) => text.Any(char.IsUpper);

        protected bool HaveLowerCaseCharacter(string text) => text.Any(char.IsLower);

        protected bool HaveDigit(string text) => text.Any(char.IsDigit);
    }
}
