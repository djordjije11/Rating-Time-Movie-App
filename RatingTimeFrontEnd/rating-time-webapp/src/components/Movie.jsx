import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import MovieDefinition from "../models/MovieDefinition";

Movie.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.instanceOf(MovieDefinition).isRequired,
    PropTypes.any,
  ]).isRequired,
  isSearchedMovie: PropTypes.bool,
  isZoomed: PropTypes.bool,
  handleZoomChange: PropTypes.func,
};

export default function Movie(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1%",
      }}
    >
      <img
        className="movieImg"
        src={props.movie.imageUrl}
        alt={props.movie.title}
        onClick={props.movie.rating===0? () => props.handleZoomChange(props.movie): undefined}
        style={{
          cursor: props.isZoomed || props.movie.rating>0 ? "default" : "pointer",
          marginTop: "10px",
          marginBottom: "10px",
          width: props.isZoomed ? "26rem" : "auto",
          height: props.isZoomed ? "38rem" : "28rem",
        }}
      />
      {props.isSearchedMovie && <p>{props.movie?.overview}</p>}
      <p
        className="movieTitle"
        style={{ height: props.isZoomed ? "40px" : "60px" }}
      >
        {props.movie.title}
      </p>
      <StarRatings
        rating={props.movie.averageVote}
        starRatedColor="orange"
        numberOfStars={5}
        starDimension="30px"
        starSpacing="10px"
      />
      <p>{props.movie.averageVote}</p>
    </div>
  );
}
