import Movie from "./Movie";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import MovieDefinition from "../models/MovieDefinition";

ZoomedMovie.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.instanceOf(MovieDefinition).isRequired,
    PropTypes.any,
  ]).isRequired,
  addMovie: PropTypes.func,
  handleRatingChange: PropTypes.func,
  setIsZoomed: PropTypes.func,
  closeZoomedMovie: PropTypes.func,
};

export default function ZoomedMovie(props) {
  return (
    <div className="zoomedWrapper">
      <div className="movieZoomed">
        <div className="movieImage">
          <button
            id="closeButton"
            style={{ alignSelf: "flex-end" }}
            onClick={props.closeZoomedMovie}
          >
            X
          </button>
          <Movie movie={props.movie} isZoomed={true} />
        </div>
        <div className="zoomedRate">
          <p className="zoomedOverview">{props.movie.overview}</p>
          <p style={{ color: "#FFFDFA" }}>Rate this movie:</p>
          <StarRatings
            rating={props.movie.rating}
            starRatedColor="orange"
            changeRating={props.handleRatingChange}
            numberOfStars={5}
            starDimension="30px"
            starSpacing="10px"
          />
          <button
            className="button-28"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              props.addMovie();
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
