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
            return await _context.Users.AnyAsync(u => u.Username == entity.Username || u.Email == entity.Email);
        }

        public async Task<User?> GetUserAsync(User user)
        {
            return await _context.Users.AsNoTracking().SingleOrDefaultAsync(u => u.Username == user.Username || u.Email == user.Email);
        }

        public async Task SaveAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }
    }
}
