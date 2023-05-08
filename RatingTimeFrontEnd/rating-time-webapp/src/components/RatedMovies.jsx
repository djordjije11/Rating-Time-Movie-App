import Movie from "./Movie";
import ZoomedMovie from "./ZoomedMovie";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import PropTypes from "prop-types";
import MovieDefinition from "../models/MovieDefinition";

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

  function removeMovie(index,ratedMovie) {
    deleteMovieFromDBAsync(ratedMovie.id)
    setRatedMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
  }
  const deleteMovieFromDBAsync= async function(id) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify ({
          movieId:id,
        }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
  
    try {
      const response = await fetch(
        "http://localhost:5165/api/rating",
        requestOptions
      );
  
      if (response.ok) {
        console.log("Rated movie deleted successfully");
      } else {
        console.error("Failed to delete rated movie");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
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

  function addMovie() {
    setRatedMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.title === selectedMovie.title) {
          return selectedMovie;
        }
        return movie;
      })
    );
    setSelectedMovie(null);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {ratedMovies.map((ratedMovie, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "20px",
              padding: "50px",
              alignItems: "center",
            }}
          >
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
                onClick={() => removeMovie(index,ratedMovie)}
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
    </>
  );
}
