import { useState, useEffect } from "react";
import { API_KEY } from "../constants.js";
import ZoomedMovie from "./ZoomedMovie.jsx";
import ListedMovies from "./ListedMovies.jsx";
import MovieDefinition from "../models/MovieDefinition.js";
import PropTypes from "prop-types";
import MovieService from "../services/MovieService.js";
Home.propTypes = {
  ratedMovies: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(MovieDefinition).isRequired,
      PropTypes.any,
    ])
  ),
  setRatedMovies: PropTypes.func,
};

export default function Home(props) {
  const [ratedMovies, setRatedMovies] = [
    props.ratedMovies,
    props.setRatedMovies,
  ];
  const [currentMovie, setCurrentMovie] = useState(new MovieDefinition());
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [txtState, setTxtState] = useState("");
  const [genres, setGenres] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    getRatedMoviesFromDBAsync();
    getGenresAsync();
    getTopMoviesAsync(currentPage);
  }, [currentPage, totalPages, totalResults]);

  const getMoviesPerPageFromJSON = function (results) {
    const numberOfMoviesPerPage = Math.ceil(totalResults / totalPages);
    return results
      .slice(0, numberOfMoviesPerPage)
      .map(
        (result) =>
          new MovieDefinition(
            result.id,
            result.title,
            `https://image.tmdb.org/t/p/original/${result.poster_path}`,
            0,
            result.overview,
            result.vote_average / 2,
            result.genre_ids
          )
      );
  };

  const getTopMoviesAsync = async function (pageNumber) {
    loader(1);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`
    );
    const responseJson = await response.json();
    setTotalPages(responseJson.total_pages);
    setTotalResults(responseJson.total_results);
    const topMovies = getMoviesPerPageFromJSON(responseJson.results);
    console.log(topMovies);
    setMovies(topMovies);
  };

  const getGenresAsync = async function () {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const responseJson = await response.json();
    setGenres(responseJson.genres);
  };

  const getMovieFromSearchAsync = async function (title) {
    loader(2);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
    );
    const responseJson = await response.json();
    const searchedMovies = getMoviesPerPageFromJSON(responseJson.results);
    setSearchedMovies(searchedMovies);
    setTxtState("");
  };

  const loader = function (type) {
    let movies = document.querySelector(".movieWrapper");
    if (type === 2) {
      movies = document.querySelector(".movieWrapperSearched");
    }
    const loading = document.querySelector(".loading");
    if (!movies || !loading) {
      console.error("Required DOM elements not found.");
      return;
    }
    loading.style.display = "flex";
    movies.classList.add("blur");
    setTimeout(() => {
      loading.style.display = "none";
      movies.classList.remove("blur");
    }, 2000);
  };

  const handlePageChange = async (pageNumber) => {
    loader(1);
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
    const selectedGenre = document.getElementById("genreSelect").value;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${pageNumber}`
    );
    const responseJson = await response.json();
    const moviesByGenre = getMoviesPerPageFromJSON(responseJson.results);
    setMovies(moviesByGenre);
  };

  const handleGenreChange = async (event) => {
    loader(1);
    const selectedGenre = event.target.value;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
    );
    const responseJson = await response.json();
    const moviesByGenre = getMoviesPerPageFromJSON(responseJson.results);
    setMovies(moviesByGenre);
  };

  const handleClose = () => {
    setCurrentMovie((prevMovie) => ({ ...prevMovie, title: "", imageUrl: "" }));
    setTxtState("");
  };

  const handleRatingChange = (newRating) => {
    setCurrentMovie((prevMovie) => ({ ...prevMovie, rating: newRating }));
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
      (ratedMovie) => ratedMovie.title === movie.title
    );
    if (ratedMovie) {
      movie.rating = ratedMovie.rating;
    }
  };

  const closeButtonOnClick = () => {
    setSearchedMovies([]);
  };

  const closeZoomedMovie = () => {
    setIsZoomed(false);
  };

  const addMovie = () => {
    const movie = currentMovie;
    const existingMovieIndex = ratedMovies.findIndex(
      (ratedMovie) => ratedMovie.title === movie.title
    );

    if (existingMovieIndex !== -1) {
      const updatedRatedMovies = [...ratedMovies];
      updatedRatedMovies[existingMovieIndex].rating = movie.rating;
      setRatedMovies(updatedRatedMovies);
    } else {
      setRatedMovies((prev) => [...prev, movie]);
    }
    addMovieToDBAsync(movie);
    handleRatingChange(0);
  };
  const addMovieToDBAsync = async function (movie) {
    console.log(movie);
    MovieService.addMovieToDBAsync(movie);
  };
  const getRatedMoviesFromDBAsync = async function () {
    const movies = await MovieService.getRatedMoviesFromDBAsync();
    setRatedMovies(movies);
  };

  return (
    <>
      <div style={{ marginLeft: "10%" }}>
        <input
          id="txtInput"
          onClick={handleClose}
          type="text"
          value={txtState}
          onChange={(event) => setTxtState(event.target.value)}
        />
        <button
          id="searchbtn"
          className="button-28"
          onClick={() => getMovieFromSearchAsync(txtState)}
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
            onClick={closeButtonOnClick}
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
          addMovie={addMovie}
          closeZoomedMovie={closeZoomedMovie}
          setIsZoomed={setIsZoomed}
          handleRatingChange={handleRatingChange}
        />
      )}
      <div className="pagination">
        <button
          className="button-28"
          style={{ visibility: currentPage > 1 ? "visible" : "hidden" }}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          BACK
        </button>
        <span
          style={{ marginLeft: "10px", marginRight: "10px", fontSize: "25px" }}
        >
          {currentPage}
        </span>
        <button
          className="button-28"
          style={{
            visibility: currentPage < totalPages ? "visible" : "hidden",
          }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          NEXT
        </button>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    </>
  );
}
