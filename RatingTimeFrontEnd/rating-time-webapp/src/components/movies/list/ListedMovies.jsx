import MovieDefinition from "../../../models/MovieDefinition";
import Movie from "../single/Movie";
import PropTypes from "prop-types";
import "../../../css/SwalPopUp.css";

ListedMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(MovieDefinition).isRequired,
      PropTypes.any,
    ])
  ).isRequired,
  styleClassName: PropTypes.string,
  handleZoomChange: PropTypes.func.isRequired,
};

export default function ListedMovies(props) {
  return (
    <div className={props.styleClassName==="movie-wrapper-searched"? "searched-movies" : undefined}>
    <div className={props.styleClassName ?? ""}>
      {props.movies.map((movie, index) => (
        <Movie
          key={index}
          movie={movie}
          handleZoomChange={props.handleZoomChange}
        />
      ))}
    </div>
    </div>
  );
}
