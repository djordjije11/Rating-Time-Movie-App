import React from "react";
import { useLocation } from "react-router-dom";
import RatedMovie from "../single/RatedMovie";

export default function UserRatedMovies() {
  const location = useLocation();
  const ratedMovies = location.state?.ratedMovies;

  return (
    <div className="movieWrapper">
      {ratedMovies.map((ratedMovie) => (
        <div className="movies">
          <RatedMovie
            key={ratedMovie.id}
            movie={ratedMovie}
            rating={ratedMovie.rating}
          />
        </div>
      ))}
    </div>
  );
}
