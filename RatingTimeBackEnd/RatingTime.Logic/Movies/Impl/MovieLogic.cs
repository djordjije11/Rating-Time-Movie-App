using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;
using RatingTime.Domain.Relationships;
using RatingTime.Logic.Exceptions;

namespace RatingTime.Logic.Movies.Impl
{
    public class MovieLogic : IMovieLogic
    {
        private readonly RatingTimeContext context;
        private readonly ILogger<MovieLogic> logger;

        public MovieLogic(RatingTimeContext context, ILogger<MovieLogic> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task SaveAsync(Movie movie)
        {
            bool movieExists = await context.Movies.AnyAsync(m => m.Id == movie.Id);
            if(movieExists) 
            {
                return;
            }

            List<MovieGenre> movieGenreList = new();
            foreach(Genre genre in movie.Genres)
            {
                if (await context.Genres.AnyAsync(g => g.Id == genre.Id))
                {
                    movieGenreList.Add(new MovieGenre()
                    {
                        GenreId = genre.Id,
                        MovieId = movie.Id
                    });
                };
            }
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
