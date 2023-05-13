import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Toast,
  errorOccurredPopUp,
  errorRefreshPagePopUp,
  ratedSuccessfullyPopUp,
  swalOptions,
} from "../popups/SwalPopUp";
import Home from "./Home";
import Login from "./auth/Login";
import RatedMovies from "./movies/list/RatedMovies";
import Users from "./users/Users";
import NavbarComponent from "./navbar/NavBarComponent";
import UserService from "../services/rating_time/UserService";
import MovieService from "../services/rating_time/MovieService";
import UserRatedMovies from "./movies/list/UserRatedMovies";
import MovieDefinition from "../models/MovieDefinition";

export default function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(new MovieDefinition());
  const [isZoomed, setIsZoomed] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  const addMovieAsync = async function () {
    console.log(currentMovie);
    const movie = { ...currentMovie };
    const response = await MovieService.addMovieToDBAsync(movie);
    if (response.ok) {
      ratedSuccessfullyPopUp(movie.title, movie.rating);
      updateInMemoryRatedMovies(movie);
    } else {
      errorOccurredPopUp();
    }
    setCurrentMovie(null);
  };

  const handleRatingChange = (newRating) => {
    setCurrentMovie((prevMovie) => ({ ...prevMovie, rating: newRating }));
  };

  const checkAuthAsync = async () => {
    const response = await UserService.checkAuth();
    if (response.ok) {
      setLoggedIn(true);
      const responseJson = await response.json();
      if (responseJson.role === "Admin") {
        setAdmin(true);
      }
    }
  };

  const getRatedMoviesAsync = async () => {
    if (isLoggedIn) {
      try {
        const ratedMovies = await MovieService.getRatedMoviesFromDBAsync();
        setRatedMovies(ratedMovies);
      } catch (error) {
        errorRefreshPagePopUp();
        console.log(
          "Error while calling rating_time API to get rated movies!",
          error
        );
      }
    }
  };

  useEffect(() => {
    checkAuthAsync();
  }, []);

  useEffect(() => {
    getRatedMoviesAsync();
  }, [isLoggedIn]);

  const updateInMemoryRatedMovies = (movie) => {
    const existingMovieIndex = ratedMovies.findIndex(
      (ratedMovie) => ratedMovie.id === movie.id
    );
    if (existingMovieIndex !== -1) {
      const updatedRatedMovies = [...ratedMovies];
      updatedRatedMovies[existingMovieIndex].rating = movie.rating;
      setRatedMovies(updatedRatedMovies);
    } else {
      setRatedMovies((prev) => [...prev, movie]);
    }
  };

  const handleLogin = async (role) => {
    if (role === "Admin") {
      setAdmin(true);
    }
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    const { value: shouldLogout } = await Swal.fire({
      ...swalOptions,
      title: "Log Out",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Log Out",
      cancelButtonText: "Cancel",
    });

    if (shouldLogout) {
      await UserService.logoutAsync();
      setAdmin(false);
      setLoggedIn(false);
      Toast.fire({
        icon: "success",
        title: "Logout successfully",
      });
    }
  };

  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <NavbarComponent isAdmin={isAdmin} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
                currentMovie={currentMovie}
                setCurrentMovie={setCurrentMovie}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                addMovieAsync={addMovieAsync}
                handleRatingChange={handleRatingChange}
              />
            }
          />
          <Route
            path="/rated-movies"
            element={
              <RatedMovies
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
                currentMovie={currentMovie}
                setCurrentMovie={setCurrentMovie}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                addMovieAsync={addMovieAsync}
                handleRatingChange={handleRatingChange}
              />
            }
          />
          <Route
            path="/users"
            element={isAdmin && <Users users={users} setUsers={setUsers} />}
          />
          <Route path="/rated-movies/:username" element={<UserRatedMovies />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
