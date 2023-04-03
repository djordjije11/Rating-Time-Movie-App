using Microsoft.EntityFrameworkCore;
using RatingTime.Domain.Models;

namespace RatingTime.DataAccess.Repositories.UserRepository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(RatingTimeContext context) : base(context)
        {
        }

        public override async Task<bool> ExistsAsync(User entity)
        {
            return await _context.Users.AnyAsync(u => u.Username == entity.Username);
        }

        public async Task SaveAsync(User user)
        {
            //user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _context.Users.AddAsync(user);
        }
    }
}
