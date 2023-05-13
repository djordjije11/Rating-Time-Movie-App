
import {
  errorOccurredPopUp,
  swalWithBootstrapButtons,
} from "../../../popups/SwalPopUp";
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
  const [ratedMovies, setRatedMovies] = [
    props.ratedMovies,
    props.setRatedMovies,
  ];
  const [currentMovie, setCurrentMovie] = [
    props.currentMovie,
    props.setCurrentMovie,
  ];
  const [isZoomed, setIsZoomed] = [props.isZoomed, props.setIsZoomed];
  const addMovieAsync = props.addMovieAsync;
  const handleRatingChange = props.handleRatingChange;
  const navigate= useNavigate();

  useEffect(() => {
    if (ratedMovies.length === 0) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: "No rated movies found!",
      }).then(() => {
      navigate('/'); 
    });
      return;
    }
  }, [ratedMovies]);

  async function removeMovieAsync(index, ratedMovie) {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure you want to delete the movie?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const response = await MovieService.deleteMovieFromDBAsync(ratedMovie.id);
      if (response.ok) {
        setRatedMovies((prevMovies) =>
          prevMovies.filter((_, i) => i !== index)
        );
        swalWithBootstrapButtons.fire(
          "Deleted!",
          `${ratedMovie.title} has been deleted.`,
          "success"
        );
      } else {
        errorOccurredPopUp();
      }
    }
  }

  return (
    <div className="movie-wrapper-rated">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="single-movie">
          <RatedMovie
            key={index}
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
