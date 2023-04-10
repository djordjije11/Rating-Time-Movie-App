using RatingTime.Domain.Models;

namespace RatingTime.Logic.Users
{
    public interface IUserLogic
    {
        Task RegisterAsync(User user);
        Task<User> LoginAsync(User user);
        Task<List<User>> GetAllAsync(int take = 100, int skip = 0);
        Task<List<User>> GetAllAsync();
        Task<int> GetCountAsync();
        Task<List<Rating>> GetRatingsAsync(int userId);
    }
}
