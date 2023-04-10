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
        /// <summary>
        /// Returns ratings of user by user's id.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of ratings by user</returns>
        Task<List<Rating>> GetRatingsAsync(int userId);
    }
}
