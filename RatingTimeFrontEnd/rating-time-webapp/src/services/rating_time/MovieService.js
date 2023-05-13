import MovieDefinition from "../../models/MovieDefinition";

const RATING_API_URL = "http://localhost:5165/api/rating";

export default class MovieService {
  static async getRatedMoviesFromJSON(response) {
    const responseJson = await response.json();
    const ratedMovies = responseJson.map((rating) => {
      return new MovieDefinition(
        rating.movie.id,
        rating.movie.title,
        rating.movie.imageUrl,
        rating.starsNumber,
        rating.movie.overview,
        rating.movie.averageRating,
        rating.movie.genres
      );
    });
    return ratedMovies;
  }

  static async getRatedMoviesFromDBAsync() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    const response = await fetch(RATING_API_URL, requestOptions);
    if (response.ok) {
      return this.getRatedMoviesFromJSON(response);
    } else {
      throw Error("Failed to retrieve rated movies from rating_time API!");
    }
  }

  static async getUserRatedMoviesAsync(username) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    const response = await fetch(
      `${RATING_API_URL}/${username}`,
      requestOptions
    );
    if (response.ok) {
      return this.getRatedMoviesFromJSON(response);
    } else {
      throw Error(
        "Failed to retrieve user's rated movies from rating_time API!"
      );
    }
  }

  static addMovieToDBAsync(movie) {
    console.log(movie);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        starsNumber: movie.rating,
        movie: {
          id: movie.id,
          title: movie.title,
          imageUrl: movie.imageUrl,
          overview: movie.overview,
          averageRating: movie.averageVote,
          genres: movie.genreIds
            ? movie.genreIds.map((id) => ({ id }))
            : undefined,
        },
      }),
      credentials: "include",
    };
    console.log(requestOptions.body);
    return fetch(RATING_API_URL, requestOptions);
  }

  static deleteMovieFromDBAsync(id) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({
        movieId: id,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    return fetch(RATING_API_URL, requestOptions);
  }
}
