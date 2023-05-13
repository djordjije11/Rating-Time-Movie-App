import { useState } from "react";
import {
  errorOccurredPopUp,
  swalWithBootstrapButtons,
} from "../../../popups/SwalPopUp";
import Modal from "react-modal";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import ZoomedMovie from "../single/ZoomedMovie";
import MovieService from "../../../services/rating_time/MovieService";
import RatedMovie from "../single/RatedMovie";

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

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (ratedMovies.length === 0) {
      setShowPopup(true);
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
    <div className="movieWrapper">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="movies">
          <RatedMovie
            key={index}
            movie={ratedMovie}
            rating={ratedMovie.rating}
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
              onClick={() => removeMovieAsync(index, ratedMovie)}
            >
              Remove rating
            </button>
            <button
              className="button-28"
              style={{
                width: "10rem",
                height: "3rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
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
      <Modal
        isOpen={showPopup}
        onRequestClose={() => setShowPopup(false)}
        className="popupModal"
        overlayClassName="popupOverlay"
      >
        <div className="popupContent">
          <h3 className="popupTitle">No rated movies found!</h3>
          <button
            className="popupButton"
            onClick={() => {
              setShowPopup(false);
              navigate("/");
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
