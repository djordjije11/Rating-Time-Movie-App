using Microsoft.EntityFrameworkCore;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;

namespace RatingTime.Logic.Users.Impl
{
    public class UserLogic : IUserLogic
    {
        private readonly RatingTimeContext context;

        public UserLogic(RatingTimeContext context)
        {
            this.context = context;
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
                throw new Exception("The username or email is already being used by an active user.");
            }
            
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            
            await context.Users.AddAsync(user);

            var userSaved = await context.SaveChangesAsync() > 0;
            if(userSaved == false)
            {
                throw new Exception("The user is not registered.");
            }
        }
    }
}
