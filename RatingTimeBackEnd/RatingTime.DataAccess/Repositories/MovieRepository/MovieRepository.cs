using Microsoft.EntityFrameworkCore;
using RatingTime.Domain.Models;

namespace RatingTime.DataAccess.Repositories.MovieRepository
{
    public class MovieRepository : Repository<Movie>, IMovieRepository
    {
        public MovieRepository(RatingTimeContext context) : base(context)
        {
        }

        public async override Task<bool> ExistsAsync(Movie entity)
        {
            return await _context.Movies.AnyAsync(m => m.Id == entity.Id);
        }

        public async Task SaveAsync(Movie movie)
        {
            await _context.Movies.AddAsync(movie);
        }
    }
}
