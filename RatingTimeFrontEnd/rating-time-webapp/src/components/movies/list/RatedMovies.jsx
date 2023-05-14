import { useEffect } from "react";
import ZoomedMovie from "../single/ZoomedMovie";
import MovieService from "../../../services/rating_time/MovieService";
import RatedMovie from "../single/RatedMovie";
import "../../../css/movie/RatedMovies.css";
import Swal from "sweetalert2";
import {swalOptions } from "../../../popups/SwalPopUp";
import { useNavigate } from "react-router";
import "../../../css/SwalPopUp.css";

export default function RatedMovies(props) {
  const {ratedMovies, setRatedMovies, currentMovie, setCurrentMovie, isZoomed, setIsZoomed, addMovieAsync, handleRatingChange} = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (ratedMovies.length === 0) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: "No rated movies found!",
      }).then(() => {
        navigate('/'); 
      });
    }
  }, [ratedMovies]);

  async function removeMovieAsync(index, ratedMovie) {
    const isRemoved = await MovieService.deleteMovieFromDBAsync(ratedMovie);
    if(isRemoved){
      setRatedMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="movie-wrapper-rated">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="single-movie">
          <RatedMovie
            key={ratedMovie.id}
            movie={ratedMovie}
            rating={ratedMovie.rating}
          />
          <div className="btn-rated-movies">
            <button className="button-28" id="button-rated"
              onClick={() => removeMovieAsync(index, ratedMovie)}
            >
              Remove rating
            </button>
            <button
              className="button-28" id="button-rated"
              onClick={() => {
                setCurrentMovie(ratedMovies[index]);
                setIsZoomed(true);
              }}
            >
              Update rating
            </button>
          </div>
        </div>
      ))}
      {isZoomed && currentMovie && (
        <ZoomedMovie
          movie={currentMovie}
          handleRatingChange={handleRatingChange}
          addMovieAsync={addMovieAsync}
          setIsZoomed={setIsZoomed}
        />
      )}
    </div>
  );
}
