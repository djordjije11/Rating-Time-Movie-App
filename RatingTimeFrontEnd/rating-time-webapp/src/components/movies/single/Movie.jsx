import RatingStars from "../stars/RatingStars";
import "../../../css/movie/Movie.css";

export default function Movie(props) {
  const {movie, isZoomed, handleZoomChange} = props;
  
  return (
    <div className="single-movie">
      <img className="movie-img"
        {...(movie.imageUrl.endsWith("null")
          ? null
          : { src: movie.imageUrl })}
        alt={movie.title}
        onClick={
          movie.rating === 0
            ? () => handleZoomChange(movie)
            : undefined
        }
        style={{
          cursor:
            isZoomed || movie.rating > 0 ? "default" : "pointer",
          width: isZoomed ? "26rem" : "auto",
          height: isZoomed ? "38rem" : "28rem",
        }}
      />
      <p
        className="movie-title"
        style={{ height: isZoomed ? "40px" : "60px" }}
      >
        {movie.title}
      </p>
      {isZoomed ? undefined : <p>Average vote</p>}
      <RatingStars rating={movie.averageVote} />
      <p>{movie.averageVote}</p>
    </div>
  );
}
