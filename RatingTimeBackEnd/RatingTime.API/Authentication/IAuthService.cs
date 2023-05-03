using RatingTime.Domain.Models;

namespace RatingTime.API.Authentication
{
    public interface IAuthService
    {
        Task LoginAsync(User user, HttpContext context);
        Task LogoutAsync(HttpContext context);
    }
}
