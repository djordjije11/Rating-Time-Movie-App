import { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import ZoomedMovie from "../single/ZoomedMovie";
import MovieService from "../../../services/rating_time/MovieService";
import RatedMovie from "../single/RatedMovie";

export default function RatedMovies(props) {
  const {ratedMovies, setRatedMovies, currentMovie, setCurrentMovie, isZoomed, setIsZoomed, addMovieAsync, handleRatingChange} = props;
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (ratedMovies.length === 0) {
      setShowPopup(true);
    }
  }, [ratedMovies]);

  async function removeMovieAsync(index, ratedMovie) {
    const isRemoved = await MovieService.deleteMovieFromDBAsync(ratedMovie.id);
    if(isRemoved){
      setRatedMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="movieWrapper">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="movies">
          <RatedMovie
            key={ratedMovie.id}
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
