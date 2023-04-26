import Film from "./Film";
import { useState, useEffect } from "react";
import { API_KEY } from "../constants.js";
import StarRatings from "react-star-ratings";
import ZoomedFilm from "./ZoomedFilm";

export default function Home(props) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [txtState, setTxtState] = useState("");
  const [filmTitle, setFilmTitle] = useState("");
  const [filmImageUrl, setFilmImageUrl] = useState("");
  const [filmShown, setFilmShown] = useState(false);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [overview, setOverview] = useState("");
  const [averageVote, setAverageVote] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    getGenresAsync();
  }, []);

  useEffect(() => {
    getTopMoviesAsync(currentPage);
  }, [currentPage, totalPages, totalResults]);

  const getMoviesPerPageFromJSON = function (results) {
    const numberOfMoviesPerPage = Math.ceil(totalResults / totalPages);
    return results.slice(0, numberOfMoviesPerPage).map((result) => {
      return {
        title: result.title,
        imageUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
        rating: rating,
        overview: result.overview,
        averageVote: result.vote_average / 2,
      };
    });
  };

  const getTopMoviesAsync = async function (pageNumber) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`
    );
    const responseJson = await response.json();
    setTotalPages(responseJson.total_pages);
    setTotalResults(responseJson.total_results);
    const topMovies = getMoviesPerPageFromJSON(responseJson.results);
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
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
    );
    const responseJson = await response.json();
    setFilmImageUrl(
      `https://image.tmdb.org/t/p/original/${responseJson.results[0].poster_path}`
    );
    setOverview(responseJson.results[0].overview);
    setFilmTitle(responseJson.results[0].title);
    setAverageVote(responseJson.results[0].vote_average / 2);
    setFilmShown(true);
    setRating(0);
  };

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    const selectedGenre = document.getElementById("genreSelect").value;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${pageNumber}`
    );
    const responseJson = await response.json();
    const moviesByGenre = getMoviesPerPageFromJSON(responseJson.results);
    setMovies(moviesByGenre);
    window.scrollTo(0, 0);
  };

  const handleGenreChange = async (event) => {
    const selectedGenre = event.target.value;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
    );
    const responseJson = await response.json();
    const moviesByGenre = getMoviesPerPageFromJSON(responseJson.results);
    setMovies(moviesByGenre);
  };

  const handleClose = () => {
    setFilmTitle("");
    setFilmImageUrl("");
    setTxtState("");
    setFilmShown(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleZoomChange = (movie) => {
    setIsZoomed(true); 
    setFilmTitle(movie.title);
    setFilmImageUrl(movie.imageUrl);
    setAverageVote(movie.averageVote);
    setOverview(movie.overview);
  };

  const closeButtonOnClick = () => {
    setFilmShown(false);
  };

  const closeZoomedMovie = () => {
    setIsZoomed(false);
  };
  const addMovie = function () {
    const film = {
      title: filmTitle,
      imageUrl: filmImageUrl,
      rating: rating,
      voteAverage: averageVote,
      overview: overview,
    };
    let contains = false;
    props.movies.forEach((element) => {
      if (element.title === film.title) {
        contains = true;
      }
    });
    if (!contains) {
      props.setMovies((prev) => [...prev, film]);
    } else {
      alert("Movie already rated!");
    }
    handleRatingChange(0);
    setFilmShown(false);
  };
  return (
    <>
      <div style={{ marginLeft: "5%" }}>
        <input
          id="txtInput"
          onClick={() => {
            handleClose();
          }}
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
      {filmShown && (
        <div className="movieWrapperSearched">
          <div className="movieSearch">
            <button
              id="closeButton"
              style={{ alignSelf: "flex-end" }}
              onClick={closeButtonOnClick}
            >
              X
            </button>
            <Film
              title={filmTitle}
              image={filmImageUrl}
              overview={overview}
              voteAverage={averageVote}
              filmShown={true}
              handleClose={handleClose}
              isSearchedMovie={true}
              rating={rating}
              setFilmTitle={setFilmTitle}
              setFilmImageUrl={setFilmImageUrl}
            />
            <div>
              <StarRatings
                rating={rating}
                starRatedColor="orange"
                changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="5px"
              />
            </div>
            <button
              onClick={addMovie}
              className="button-28"
              style={{ marginTop: "1rem" }}
            >
              Save rating
            </button>
          </div>
        </div>
      )}

      <div className="movieWrapper">
        {movies.map((movie, index) => (
          <Film
            key={index}
            title={movie.title}
            image={movie.imageUrl}
            voteAverage={movie.averageVote}
            overview={movie.overview}
            filmShown={false}
            rating={movie.rating}
            isSearchedMovie={false}
            onClick={() => handleZoomChange(movie)}
          />
        ))}
      </div>

      {isZoomed && (
        <ZoomedFilm
          closeZoomedMovie = {closeZoomedMovie}
          addMovie = {addMovie}
          setIsZoomed = {setIsZoomed}
          title={filmTitle}
          image={filmImageUrl}
          voteAverage={averageVote}
          isZoomed={true}
          overview={overview}
          rating={rating}
          setRating={setRating}
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
        style={{marginLeft: "10px", marginRight: "10px", fontSize: "25px"}}
        >{currentPage}</span>
        <button
          className="button-28"
          style={{
            visibility: currentPage < totalPages ? "visible" : "hidden",
          }}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          NEXT
        </button>
      </div>
    </>
  );
}
