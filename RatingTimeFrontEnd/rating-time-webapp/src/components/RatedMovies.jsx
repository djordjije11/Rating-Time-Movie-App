import Movie from "./Movie";
import ZoomedMovie from "./ZoomedMovie";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import PropTypes from "prop-types";
import MovieDefinition from "../models/MovieDefinition";
import MovieService from "../services/MovieService";

RatedMovies.propTypes = {
  ratedMovies: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(MovieDefinition).isRequired,
      PropTypes.any,
    ])
  ),
  setRatedMovies: PropTypes.func,
};

export default function RatedMovies(props) {
  const [ratedMovies, setRatedMovies] = [
    props.ratedMovies,
    props.setRatedMovies,
  ];
  const [showZoomedFilm, setShowZoomedFilm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function removeMovie(index, ratedMovie) {
    deleteMovieFromDBAsync(ratedMovie.id);
    setRatedMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
  }
  const deleteMovieFromDBAsync = async function (id) {
    MovieService.deleteMovieFromDBAsync(id);
  };
  function updateMovieRating(index) {
    setSelectedMovie(ratedMovies[index]);
    setShowZoomedFilm(true);
  }

  function closeZoomedMovie() {
    setShowZoomedFilm(false);
  }

  function handleRatingChange(newRating) {
    setSelectedMovie({ ...selectedMovie, rating: newRating });
  }

  async function addMovie() {
    const response= await MovieService.addMovieToDBAsync(selectedMovie);
    // PROVERITI DA LI SE SACUVALO USPESNO
    // AKO JESTE - IZVRSI DALJE KOD, SACUVAJ I U REACTU
    // AKO NIJE - PRIKAZI GRESKU, NEKAKO JE OBRADI I NE CUVAJ U REACTU
    // treba proci ceo kod jos par puta i sagledati ovako svaki slucaj...

    setRatedMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === selectedMovie.id) {
          return selectedMovie;
        }
        return movie;
      })
    );
    setSelectedMovie(null);
  }

  return (
    <div className="movieWrapper">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="movies">
          <Movie key={index} movie={ratedMovie} />
          <StarRatings
            rating={ratedMovie.rating}
            starRatedColor="orange"
            numberOfStars={5}
            starDimension="30px"
            starSpacing="10px"
          /> 
          <div className="btnRatedMovies">
            <button
              className="button-28"
              style={{
                width: "10rem",
                height: "3rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
              onClick={() => removeMovie(index, ratedMovie)}
            >
              Remove the rating
            </button>
            <button
              className="button-28"
              style={{
                width: "10rem",
                height: "3rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
              onClick={() => updateMovieRating(index)}
            >
              Update the rating
            </button>
            
          </div>
        </div>
      ))}

      {showZoomedFilm && selectedMovie && (
        <ZoomedMovie
          movie={selectedMovie}
          handleRatingChange={handleRatingChange}
          addMovie={addMovie}
          setIsZoomed={setShowZoomedFilm}
          closeZoomedMovie={closeZoomedMovie}
        />
      )}
    </div>
  );
}
