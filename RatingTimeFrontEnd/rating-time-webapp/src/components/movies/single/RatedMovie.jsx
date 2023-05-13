import Movie from "./Movie";
import RatingStars from "../stars/RatingStars";

export default function RatedMovie(props) {
  const movie = props.movie;
  const rating = props.rating;
  return (
    <>
      <Movie movie={movie} />
      <RatingStars rating={rating} />
    </>
  );
}
