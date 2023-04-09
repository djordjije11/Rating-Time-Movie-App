using RatingTime.Domain.Models;

namespace RatingTime.Logic.Users
{
    public interface IUserLogic
    {
        Task RegisterAsync(User user);
        Task LoginAsync(User user);
        Task<List<User>> GetAllAsync();
    }
}
