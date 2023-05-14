import Movie from "./Movie";
import RatingStars from "../stars/RatingStars";
import "../../../css/movie/ZoomedMovie.css";

export default function ZoomedMovie(props) {
  const {movie, addMovieAsync, handleRatingChange, setIsZoomed} = props;

  return (
    <div className="zoomed-wrapper">
      <div className="movie-zoomed">
        <div className="movie-img">
          <button id="button-close"
            onClick={() => setIsZoomed(false)}
          >
            X
          </button>
          <Movie movie={movie} isZoomed={true} />
        </div>
        <div className="zoomed-rate">
          <p className="zoomed-overview">{movie.overview}</p>
          <p >Rate this movie:</p>
          <RatingStars
            rating={movie.rating}
            changeRating={handleRatingChange}
          />
          <button
            className="button-28"
            id="button-save"
            onClick={() => {
              addMovieAsync();
              setIsZoomed(false);
            }}
          >
            Save rating
          </button>
        </div>
      </div>
    </div>
  );
}
