import RatingStars from "../stars/RatingStars";
import noMovieImg from "../../../images/no-movie-img.png";


export default function Movie(props) {
  const {movie, isZoomed, handleZoomChange} = props;
  
  return (
    <div className="single-movie">
      <img className="movie-img"
        {...(movie.imageUrl.endsWith("null")
          ? { src: noMovieImg}
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
