using RatingTime.Domain.Models;

namespace RatingTime.DataAccess.Repositories.UserRepository
{
    public interface IUserRepository : IRepository<User>
    {
        Task SaveAsync(User user);
        Task<User?> GetUserAsync(User user);
    }
}
