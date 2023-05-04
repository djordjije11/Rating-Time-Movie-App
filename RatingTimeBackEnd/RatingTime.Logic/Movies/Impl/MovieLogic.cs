using Microsoft.EntityFrameworkCore;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;
using RatingTime.Domain.Relationships;

namespace RatingTime.Logic.Movies.Impl
{
    public class MovieLogic : IMovieLogic
    {
        private readonly RatingTimeContext context;

        public MovieLogic(RatingTimeContext context)
        {
            this.context = context;
        }

        public async Task SaveAsync(Movie movie)
        {
            bool movieExists = await context.Movies.AnyAsync(m => m.Id == movie.Id);
            if(movieExists) 
            {
                return;
            }

            List<MovieGenre> movieGenreList = movie.Genres.Select(genre => new MovieGenre()
            {
                GenreId = genre.Id,
                MovieId = movie.Id
            }).ToList();
            movie.Genres = null;

            await context.Movies.AddAsync(movie);
            await context.MovieGenreList.AddRangeAsync(movieGenreList);

            var movieSaved = await context.SaveChangesAsync() > 0;
            if (movieSaved == false)
            {
                throw new Exception("The movie is not saved.");
            }
        }
    }
}
