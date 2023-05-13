import Movie from "./Movie";
import PropTypes from "prop-types";
import MovieDefinition from "../../../models/MovieDefinition";
import RatingStars from "../stars/RatingStars";

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
    <div className="zoomedWrapper">
      <div className="movieZoomed">
        <div className="movieImage">
          <button
            id="closeButton"
            style={{ alignSelf: "flex-end" }}
            onClick={() => props.setIsZoomed(false)}
          >
            X
          </button>
          <Movie movie={props.movie} isZoomed={true} />
        </div>
        <div className="zoomedRate">
          <p className="zoomedOverview">{props.movie.overview}</p>
          <p style={{ color: "#FFFDFA" }}>Rate this movie:</p>
          <RatingStars
            rating={props.movie.rating}
            changeRating={props.handleRatingChange}
          />
          <button
            className="button-28"
            style={{ marginTop: "1rem" }}
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
