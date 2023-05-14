import Movie from "./Movie";
import RatingStars from "../stars/RatingStars";

export default function ZoomedMovie(props) {
  const {movie, addMovieAsync, handleRatingChange, setIsZoomed} = props;

  return (
    <div className="zoomedWrapper">
      <div className="movieZoomed">
        <div className="movieImage">
          <button
            id="closeButton"
            style={{ alignSelf: "flex-end" }}
            onClick={() => setIsZoomed(false)}
          >
            X
          </button>
          <Movie movie={movie} isZoomed={true} />
        </div>
        <div className="zoomedRate">
          <p className="zoomedOverview">{movie.overview}</p>
          <p style={{ color: "#FFFDFA" }}>Rate this movie:</p>
          <RatingStars
            rating={movie.rating}
            changeRating={handleRatingChange}
          />
          <button
            className="button-28"
            style={{ marginTop: "1rem" }}
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
