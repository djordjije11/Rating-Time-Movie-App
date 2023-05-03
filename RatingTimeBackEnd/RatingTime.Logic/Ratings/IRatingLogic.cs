using RatingTime.Domain.Models;

namespace RatingTime.Logic.Ratings
{
    public interface IRatingLogic
    {
        /// <summary>
        /// Returns ratings of user by user's id.
        /// </summary>
        /// <param name="userId">User's id</param>
        /// <param name="cancellationToken"></param>
        /// <returns>List of ratings by user</returns>
        Task<List<Rating>> GetAllByUserAsync(int userId, CancellationToken cancellationToken);
        Task SaveAsync(Rating rating);
        Task DeleteAsync(Rating rating);
    }
}
