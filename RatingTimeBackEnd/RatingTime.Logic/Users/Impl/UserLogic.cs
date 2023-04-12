using Microsoft.EntityFrameworkCore;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;
using RatingTime.Logic.Exceptions;

namespace RatingTime.Logic.Users.Impl
{
    public class UserLogic : IUserLogic
    {
        private readonly RatingTimeContext context;

        public UserLogic(RatingTimeContext context)
        {
            this.context = context;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await context.Users.AsNoTracking().OrderBy(u => u.Username).ToListAsync();
        }

        public async Task<List<User>> GetAllAsync(int take = 100, int skip = 0)
        {
            return await context.Users.AsNoTracking().OrderBy(u => u.Username).Skip(skip).Take(take).ToListAsync();
        }

        public async Task<int> GetCountAsync()
        {
            return await context.Users.CountAsync();
        }

        public async Task<List<Rating>> GetRatingsAsync(int userId)
        {
            return await context.Ratings.AsNoTracking()
                                        .Include(r => r.Movie)
                                        .Where(r => r.UserId == userId)
                                        .Select(r => new Rating
                                        {
                                            Id = r.Id,
                                            StarsNumber = r.StarsNumber,
                                            Movie = r.Movie
                                        })
                                        .ToListAsync();
        }

        public async Task<User> LoginAsync(User user)
        {
            var dbUser = await context.Users.AsNoTracking().SingleOrDefaultAsync(u => u.Username == user.Username || u.Email == user.Email);

            if (dbUser == null)
            {
                throw new LogicException("Wrong username or e-mail.");
            }
            if (BCrypt.Net.BCrypt.Verify(user.Password, dbUser.Password) == false)
            {
                throw new LogicException("Wrong password.");
            }

            return dbUser;
        }

        public async Task RegisterAsync(User user)
        {
            bool userExists = await context.Users.AnyAsync(u => u.Username == user.Username || u.Email == user.Email);
            if (userExists)
            {
                throw new LogicException("The username or email is already being used by an active user.");
            }
            
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            try
            {
                await context.Users.AddAsync(user);

                var userSaved = await context.SaveChangesAsync() > 0;
                if (userSaved == false)
                {
                    throw new Exception("The user is not registered.");
                }
            }
            catch(Exception ex)
            {
                throw new Exception($"{DateTime.Now}: {ToString()} - Database Exception! The user is not saved successfully while registering.\n{ex.Message}", ex);
            }
            
        }
    }
}
