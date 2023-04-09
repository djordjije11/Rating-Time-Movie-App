using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;

namespace RatingTime.Logic.Users.Impl
{
    public class UserLogic : IUserLogic
    {
        private readonly RatingTimeContext context;
        private readonly ILogger<UserLogic> logger;

        public UserLogic(RatingTimeContext context, ILogger<UserLogic> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await context.Users.AsNoTracking().ToListAsync();
        }

        public async Task LoginAsync(User user)
        {
            var hashedPassword = await context.Users.AsNoTracking()
                                                    .Where(u => u.Username == user.Username || u.Email == user.Email)
                                                    .Select(u => u.Password)
                                                    .SingleOrDefaultAsync();

            if (hashedPassword == null)
            {
                throw new Exception("Wrong username or e-mail.");
            }
            if (BCrypt.Net.BCrypt.Verify(user.Password, hashedPassword) == false)
            {
                throw new Exception("Wrong password.");
            }
        }

        public async Task RegisterAsync(User user)
        {
            bool userExists = await context.Users.AnyAsync(u => u.Username == user.Username || u.Email == user.Email);
            if (userExists)
            {
                logger.LogError($"{DateTime.Now}: Database error! The user is not saved successfully while registering.");
                throw new Exception("The username or email is already being used by an active user.");
            }
            
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            
            await context.Users.AddAsync(user);

            var userSaved = await context.SaveChangesAsync() > 0;
            if(userSaved == false)
            {
                logger.LogError($"{DateTime.Now}: {ToString()} - Database error! The user is not saved successfully while registering.");
                throw new Exception("The user is not registered.");
            }
        }
    }
}
