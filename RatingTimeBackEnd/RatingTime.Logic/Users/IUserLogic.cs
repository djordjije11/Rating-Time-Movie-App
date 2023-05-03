using RatingTime.Domain.Models;

namespace RatingTime.Logic.Users
{
    public interface IUserLogic
    {
        /// <summary>
        /// Saves user to the database.
        /// <para>
        /// LogicException
        /// <br/>
        /// - If the username or email is already being used by an active user.
        /// <br/>
        /// Exception
        /// <br/>
        /// - If the user is not saved successfully.
        /// </para>
        /// </summary>
        /// <param name="user">User with valid username, email and password</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        /// <exception cref="LogicException">If the username or email is already being used by an active user.</exception>
        /// <exception cref="Exception">If the user is not saved successfully.</exception>
        Task SaveAsync(User user);
        Task<User> GetUserAndCheckPasswordAsync(User user, CancellationToken cancellationToken);
        Task<List<User>> GetAllAsync(int take, int skip, CancellationToken cancellationToken);
        Task<List<User>> GetAllAsync(CancellationToken cancellationToken);
        Task<int> GetCountAsync(CancellationToken cancellationToken);
    }
}
