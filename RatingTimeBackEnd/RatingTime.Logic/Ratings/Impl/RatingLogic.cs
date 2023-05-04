using Microsoft.EntityFrameworkCore;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;
using RatingTime.Domain.Relationships;
using System.Collections.Generic;

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
            var dbRating = await context.Ratings.FirstAsync(r => r.MovieId == rating.MovieId);
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
                                        .Select(r => new Rating
                                        {
                                            Id = r.Id,
                                            StarsNumber = r.StarsNumber,
                                            Movie = r.Movie
                                        })
                                        .ToListAsync(cancellationToken);
        }

        public async Task SaveAsync(Rating rating)
        {
            var dbRating = await context.Ratings.FirstOrDefaultAsync(r => r.MovieId == rating.MovieId && r.UserId == rating.UserId);

            if(dbRating != null)
            {
                dbRating.StarsNumber = rating.StarsNumber;
            }
            else
            {
                var movieExists = await context.Movies.AnyAsync(m => m.Id == rating.MovieId);
                if (movieExists)
                {
                    //rating.Movie = null;
                    rating.Movie.Genres = null;
                }
                else
                {
                    //Genres are all in the database already
                    List<MovieGenre> movieGenreList = rating.Movie.Genres.Select(genre => new MovieGenre()
                    {
                        GenreId = genre.Id,
                        MovieId = rating.MovieId
                    }).ToList();
                    await context.MovieGenreList.AddRangeAsync(movieGenreList);
                    rating.Movie.Genres = null;
                }
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
