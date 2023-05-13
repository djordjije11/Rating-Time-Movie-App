import React from "react";
import { useLocation } from "react-router-dom";
import RatedMovie from "../single/RatedMovie";

export default function UserRatedMovies() {
  const location = useLocation();
  const ratedMovies = location.state?.ratedMovies;

  return (
    <div className="movieWrapper">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="movies">
          <RatedMovie
            key={index}
            movie={ratedMovie}
            rating={ratedMovie.rating}
          />
        </div>
      ))}
    </div>
  );
}
