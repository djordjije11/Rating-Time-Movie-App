using RatingTime.Domain.Models;

namespace RatingTime.DataAccess.Repositories.MovieRepository
{
    public interface IMovieRepository : IRepository<Movie>
    {
        Task SaveAsync(Movie movie);
    }
}
