using Microsoft.EntityFrameworkCore;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;
using RatingTime.Logic.Exceptions;

namespace RatingTime.Logic.Ratings.Impl
{
    public class RatingLogic : IRatingLogic
    {
        private readonly RatingTimeContext context;

        public RatingLogic(RatingTimeContext context)
        {
            this.context = context;
        }

        public async Task DeleteAsync(Rating rating)
        {
            var dbRating = await context.Ratings.FirstOrDefaultAsync(r => r.MovieId == rating.MovieId && r.UserId == rating.UserId);
            if(dbRating == null)
            {
                return;
            }
            context.Ratings.Remove(dbRating);

            var ratingRemoved = await context.SaveChangesAsync() > 0;
            if (ratingRemoved == false)
            {
                throw new Exception("The rating is not removed.");
            }
        }

        public async Task<List<Rating>> GetAllByUserAsync(int userId, CancellationToken cancellationToken)
        {
            return await context.Ratings.AsNoTracking()
                                        .Include(r => r.Movie)
                                        .Where(r => r.UserId == userId)
                                        .ToListAsync(cancellationToken);
        }

        public async Task<List<Rating>> GetAllByUserAsync(string username, CancellationToken cancellationToken)
        {
            return await context.Ratings.AsNoTracking()
                .Include(r => r.Movie)
                .Where(r => r.User.Username == username)
                .ToListAsync();
        }

        public async Task SaveAsync(Rating rating)
        {
            var movieExists = await context.Movies.AnyAsync(m => m.Id == rating.MovieId);
            if(movieExists == false)
            {
                throw new LogicException("The movie user is rating is not in the database!");
            }

            var dbRating = await context.Ratings.FirstOrDefaultAsync(r => r.MovieId == rating.MovieId && r.UserId == rating.UserId);

            if(dbRating != null)
            {
                if(dbRating.StarsNumber == rating.StarsNumber)
                {
                    return;
                }
                dbRating.StarsNumber = rating.StarsNumber;
            }
            else
            {
                rating.Movie = null;
                await context.Ratings.AddAsync(rating);
            }

            var ratingSaved = await context.SaveChangesAsync() > 0;
            if (ratingSaved == false)
            {
                throw new Exception("The rating is not saved.");
            }
        }
    }
}
