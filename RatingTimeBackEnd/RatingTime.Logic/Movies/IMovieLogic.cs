using RatingTime.Domain.Models;

namespace RatingTime.Logic.Movies
{
    public interface IMovieLogic
    {
        Task SaveAsync(Movie movie);
    }
}
