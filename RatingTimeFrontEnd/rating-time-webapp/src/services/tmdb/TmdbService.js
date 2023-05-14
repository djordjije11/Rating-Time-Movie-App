import MovieDefinition from "../../models/MovieDefinition";
import { TMDB_API_KEY } from "../../secrets/constants";

const TMDB_API_GENRES_LINK = "https://api.themoviedb.org/3/genre/movie/list";
const TMDB_API_POPULAR_MOVIES_LINK =
  "https://api.themoviedb.org/3/movie/popular";
const TMDB_API_POPULAR_MOVIES_WITH_GENRES_LINK =
  "https://api.themoviedb.org/3/discover/movie";
const TMDB_API_SEARCH_MOVIE_LINK = "https://api.themoviedb.org/3/search/movie";
const TMDB_API_MOVIE_IMAGE_URL_BASE = "https://image.tmdb.org/t/p/original/";

export default class TmdbService {
  static async getGenresAsync() {
    const response = await fetch(`${TMDB_API_GENRES_LINK}?api_key=${TMDB_API_KEY}`);
    const responseJson = await response.json();
    return responseJson.genres;
  }
  static async getTopMoviesAsync(pageNumber) {
    const response = await fetch(
      `${TMDB_API_POPULAR_MOVIES_LINK}?api_key=${TMDB_API_KEY}&page=${pageNumber}`
    );
    const responseJson = await response.json();
    return {
      total_pages,
      total_results,
      results
    } = responseJson;
  }
  static async getMovieFromSearchAsync(title) {
    const response = await fetch(
      `${TMDB_API_SEARCH_MOVIE_LINK}?api_key=${TMDB_API_KEY}&query=${title}`
    );
    const responseJson = await response.json();
    return responseJson.results;
  }
  static async getTopMoviesWithGenreAsync(genre, pageNumber) {
    const pageNumberQuery = "";
    if (pageNumber !== undefined && pageNumber > 0) {
      pageNumberQuery = `&page=${pageNumber}`;
    }
    const response = await fetch(
      `${TMDB_API_POPULAR_MOVIES_WITH_GENRES_LINK}?api_key=${TMDB_API_KEY}&with_genres=${genre}${pageNumberQuery}`
    );
    const responseJson = await response.json();
    return responseJson.results;
  }
  static getMoviesPerPageFromJSON(results, numberOfMoviesPerPage) {
    return results
      .slice(0, numberOfMoviesPerPage)
      .map(
        (result) =>
          new MovieDefinition(
            result.id,
            result.title,
            `${TMDB_API_MOVIE_IMAGE_URL_BASE}${result.poster_path}`,
            0,
            result.overview,
            Math.round((result.vote_average / 2) * 100) / 100,
            result.genre_ids
          )
      );
  }
}
