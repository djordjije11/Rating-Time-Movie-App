import StarRatings from "react-star-ratings";

export default function RatingStars(props) {
  const { rating, changeRating } = props;

  return (
    <StarRatings
      rating={rating}
      starRatedColor="orange"
      changeRating={changeRating}
      numberOfStars={5}
      starDimension="30px"
      starSpacing="10px"
    />
  );
}
