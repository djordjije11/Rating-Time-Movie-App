import {
  errorOccurredPopUp,
  errorRefreshPagePopUp,
  ratedSuccessfullyPopUp,
  deleteRatedMovieQuestionPopUpAsync,
  deletedRatedMovieSuccessfullyPopUp,
} from "../../popups/SwalPopUp";
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
    }
    errorRefreshPagePopUp();
    return null;
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
    }
    errorRefreshPagePopUp();
    return null;
  }

  static async addMovieToDBAsync(movie) {
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
    const response = await fetch(RATING_API_URL, requestOptions);
    if (response.ok) {
      ratedSuccessfullyPopUp(movie.title, movie.rating);
      return true;
    }
    errorOccurredPopUp();
    return false;
  }

  static async deleteMovieFromDBAsync(ratedMovie) {
    const isConfirmed = await deleteRatedMovieQuestionPopUpAsync();
    if (isConfirmed === false) {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({
        movieId: ratedMovie.id,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    const response = await fetch(RATING_API_URL, requestOptions);
    if (response.ok === false) {
      errorOccurredPopUp();
      return false;
    }
    deletedRatedMovieSuccessfullyPopUp(ratedMovie.title);
    return true;
  }
}
