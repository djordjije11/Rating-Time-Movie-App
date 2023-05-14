import RatingStars from "../stars/RatingStars";

export default function Movie(props) {
  const {movie, isZoomed, handleZoomChange} = props;
  
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
          marginTop: "10px",
          marginBottom: "10px",
          width: isZoomed ? "26rem" : "auto",
          height: isZoomed ? "38rem" : "28rem",
        }}
      />
      <p
        className="movieTitle"
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
