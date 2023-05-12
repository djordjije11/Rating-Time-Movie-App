import React from "react";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Movie from "./Movie";
export default function UserRatedMovies() {
  const location = useLocation();
  const ratedMovies = location.state?.ratedMovies;

  return (
    <div className="movieWrapper">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="movies">
          <Movie key={index} movie={ratedMovie} />
          <StarRatings
            rating={ratedMovie.rating}
            starRatedColor="orange"
            numberOfStars={5}
            starDimension="30px"
            starSpacing="10px"
          />
        </div>
      ))}
    </div>
  );
}
