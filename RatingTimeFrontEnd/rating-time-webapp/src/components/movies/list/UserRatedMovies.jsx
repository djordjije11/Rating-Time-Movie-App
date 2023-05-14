import React from "react";
import { useLocation } from "react-router-dom";
import RatedMovie from "../single/RatedMovie";
import "../../../css/Home.css";

export default function UserRatedMovies() {
  const location = useLocation();
  const ratedMovies = location.state?.ratedMovies;

  return (
    <div className="movie-wrapper">
      {ratedMovies.map((ratedMovie) => (
        <div className="rated-movie">
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
