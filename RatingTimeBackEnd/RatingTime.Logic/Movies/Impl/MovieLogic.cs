using Microsoft.EntityFrameworkCore;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;
using RatingTime.Domain.Relationships;
using RatingTime.Logic.Exceptions;

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

            foreach (Genre genre in movie.Genres)
            {
                if (await context.Genres.AnyAsync(g => g.Id == genre.Id))
                {
                    await context.MovieGenreList.AddAsync(new MovieGenre()
                    {
                        GenreId = genre.Id,
                        MovieId = movie.Id
                    });
                }
                else
                {
                    throw new LogicException($"The movie's genre is not in the database: {genre}");
                }
            }

            movie.Genres = null;
            await context.Movies.AddAsync(movie);

            var movieSaved = await context.SaveChangesAsync() > 0;
            if (movieSaved == false)
            {
                throw new Exception("The movie is not saved.");
            }
        }
    }
}
