import { useState, useEffect } from "react";
import ZoomedMovie from "./movies/single/ZoomedMovie.jsx";
import ListedMovies from "./movies/list/ListedMovies.jsx";
import MovieDefinition from "../models/MovieDefinition.js";
import TmdbService from "../services/tmdb/TmdbService.js";
import Pagination, { loader } from "./Pagination";

export default function Home(props) {
  const {ratedMovies, currentMovie, setCurrentMovie, isZoomed, setIsZoomed, addMovieAsync, handleRatingChange} = props;
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTextField, setSearchTextField] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenresAsync();
    getTopMoviesAsync(currentPage);
  }, [currentPage, totalPages, totalResults]);

  const getGenresAsync = async function () {
    const genres = await TmdbService.getGenresAsync();
    setGenres(dgenres);
  };

  const getMoviesPerPageFromJSON = function (results) {
    const numberOfMoviesPerPage = Math.ceil(totalResults / totalPages);
    return TmdbService.getMoviesPerPageFromJSON(results, numberOfMoviesPerPage);
  };

  const getTopMoviesAsync = async function (pageNumber) {
    loader(1);
    const {
      total_pages,
      total_results,
      results
    } = await TmdbService.getTopMoviesAsync(pageNumber);
    setTotalPages(total_pages);
    setTotalResults(total_results);
    const topMovies = getMoviesPerPageFromJSON(results);
    setMovies(topMovies);
  };

  const getTopMoviesWithGenreAsync = async function (genre, pageNumber) {
    const results = await TmdbService.getTopMoviesWithGenreAsync(
      genre,
      pageNumber
    );
    const moviesByGenre = getMoviesPerPageFromJSON(results);
    setMovies(moviesByGenre);
  };

  const getMovieFromSearchAsync = async function (title) {
    loader(2);
    const results = await TmdbService.getMovieFromSearchAsync(title);
    const searchedMovies = getMoviesPerPageFromJSON(results);
    setSearchedMovies(searchedMovies);
    setSearchTextField("");
  };

  const handlePageChange = async (pageNumber) => {
    loader(1);
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
    const selectedGenre = document.getElementById("genreSelect").value;
    getTopMoviesWithGenreAsync(selectedGenre, pageNumber);
  };

  const handleGenreChange = async (event) => {
    loader(1);
    const selectedGenre = event.target.value;
    getTopMoviesWithGenreAsync(selectedGenre);
  };

  const handleClose = () => {
    setCurrentMovie((prevMovie) => ({ ...prevMovie, title: "", imageUrl: "" }));
    setSearchTextField("");
  };

  const handleZoomChange = (movie) => {
    const newMovie = new MovieDefinition();
    newMovie.id = movie.id;
    newMovie.title = movie.title;
    newMovie.imageUrl = movie.imageUrl;
    newMovie.averageVote = movie.averageVote;
    newMovie.overview = movie.overview;
    newMovie.genreIds = movie.genreIds;
    checkIfMovieIsRated(newMovie);
    setCurrentMovie(newMovie);
    setIsZoomed(true);
  };

  const checkIfMovieIsRated = (movie) => {
    const ratedMovie = ratedMovies.find(
      (ratedMovie) => ratedMovie.id === movie.id
    );
    if (ratedMovie) {
      movie.rating = ratedMovie.rating;
    }
  };

  return (
    <>
      <div style={{ marginLeft: "10%" }}>
        <input
          id="txtInput"
          onClick={handleClose}
          type="text"
          value={searchTextField}
          onChange={(event) => setSearchTextField(event.target.value)}
        />
        <button
          id="searchbtn"
          className="button-28"
          onClick={() => getMovieFromSearchAsync(searchTextField)}
        >
          Search
        </button>

        <select
          id="genreSelect"
          className="button-28"
          onChange={handleGenreChange}
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {searchedMovies.length > 0 && (
        <div>
          <button
            id="closeButton"
            style={{
              alignSelf: "flex-end",
              position: "absolute",
              top: "20%",
              right: "5%",
            }}
            onClick={() => setSearchedMovies([])}
          >
            X
          </button>
          <ListedMovies
            movies={searchedMovies}
            styleClassName={"movieWrapperSearched"}
            handleZoomChange={handleZoomChange}
          />
          <hr
            style={{
              visibility: searchedMovies.length > 0 ? "visible" : "hidden",
            }}
          />
        </div>
      )}
      <ListedMovies
        movies={movies}
        styleClassName={"movieWrapper"}
        handleZoomChange={handleZoomChange}
      />
      {isZoomed && (
        <ZoomedMovie
          movie={currentMovie}
          addMovieAsync={addMovieAsync}
          setIsZoomed={setIsZoomed}
          handleRatingChange={handleRatingChange}
        />
      )}
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        toShow={Array.isArray(movies) === true && movies.length > 0}
      />
    </>
  );
}
