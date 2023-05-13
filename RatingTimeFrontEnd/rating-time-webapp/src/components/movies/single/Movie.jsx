import PropTypes from "prop-types";
import MovieDefinition from "../../../models/MovieDefinition";
import RatingStars from "../stars/RatingStars";

Movie.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.instanceOf(MovieDefinition).isRequired,
    PropTypes.any,
  ]).isRequired,
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
        {...(props.movie.imageUrl.endsWith("null")
          ? null
          : { src: props.movie.imageUrl })}
        alt={props.movie.title}
        onClick={
          props.movie.rating === 0
            ? () => props.handleZoomChange(props.movie)
            : undefined
        }
        style={{
          cursor:
            props.isZoomed || props.movie.rating > 0 ? "default" : "pointer",
          marginTop: "10px",
          marginBottom: "10px",
          width: props.isZoomed ? "26rem" : "auto",
          height: props.isZoomed ? "38rem" : "28rem",
        }}
      />
      <p
        className="movieTitle"
        style={{ height: props.isZoomed ? "40px" : "60px" }}
      >
        {props.movie.title}
      </p>
      {props.isZoomed ? undefined : <p>Average vote</p>}

      <RatingStars rating={props.movie.averageVote} />
      <p>{props.movie.averageVote}</p>
    </div>
  );
}
