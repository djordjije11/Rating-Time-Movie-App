import Movie from "./Movie";
import RatingStars from "../stars/RatingStars";

export default function RatedMovie(props) {
  const {movie, rating} = props;
  
  return (
    <>
      <Movie movie={movie} />
      <RatingStars rating={rating} />
    </>
  );
}
