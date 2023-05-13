import Movie from "./Movie";
import PropTypes from "prop-types";
import MovieDefinition from "../../../models/MovieDefinition";
import RatingStars from "../stars/RatingStars";
import "../../../css/movie/ZoomedMovie.css";
import "../../../css/movie/Movie.css";
ZoomedMovie.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.instanceOf(MovieDefinition).isRequired,
    PropTypes.any,
  ]).isRequired,
  addMovieAsync: PropTypes.func,
  handleRatingChange: PropTypes.func,
  setIsZoomed: PropTypes.func,
};

export default function ZoomedMovie(props) {
  return (
    <div className="zoomed-wrapper">
      <div className="movie-zoomed">
        <div className="movie-img">
          <button id="button-close"
            onClick={() => props.setIsZoomed(false)}
          >
            X
          </button>
          <Movie movie={props.movie} isZoomed={true} />
        </div>
        <div className="zoomed-rate">
          <p className="zoomed-overview">{props.movie.overview}</p>
          <p >Rate this movie:</p>
          <RatingStars
            rating={props.movie.rating}
            changeRating={props.handleRatingChange}
          />
          <button
            className="button-28"
            id="button-save"
            onClick={() => {
              props.addMovieAsync();
              props.setIsZoomed(false);
            }}
          >
            Save rating
          </button>
        </div>
      </div>
    </div>
  );
}
