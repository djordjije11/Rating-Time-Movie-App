import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import "../App.css";
import Login from "./Login";
import RatedMovies from "./RatedMovies";
import Users from "./Users";
import NavbarComponent from "./NavBarComponent";
import UserService from "../services/UserService";
import MovieService from "../services/MovieService";
import Swal from 'sweetalert2';
import UserRatedMovies from "./UserRatedMovies";
export default function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const swalOptions = {
    
    customClass: {
      container: 'custom-container-class',
      title: 'custom-title-class',
      content: 'custom-content-class',
      confirmButton: 'custom-confirm-button-class',
    },
  };
  const checkAuth = async () => {
    const response = await UserService.checkAuth();
    if (response.ok) {
      setLoggedIn(true);
      const responseJson = await response.json();
      if (responseJson.role === "Admin") {
        setAdmin(true);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        setRatedMovies(await MovieService.getRatedMoviesFromDBAsync());
      }
    })();
  }, [isLoggedIn]);

  const handleLogin = async (role) => {
    if (role === "Admin") {
      setAdmin(true);
    }
    setLoggedIn(true);
  };
  const handleLogout = async () => {
    const { value: shouldLogout } = await Swal.fire({
      ...swalOptions,
      title: 'Log Out',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Log Out',
      cancelButtonText: 'Cancel',
    });

    if (shouldLogout) {
      await UserService.logoutAsync();
      setAdmin(false);
      setLoggedIn(false);
      Toast.fire({
        icon: 'success',
        title: 'Logout successfully'
      })
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
              <Home ratedMovies={ratedMovies} setRatedMovies={setRatedMovies} />
            }
          />
          <Route
            path="/rated-movies"
            element={
              <RatedMovies
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
              />
            }
          /> 
          <Route
            path="/users"
            element={
              isAdmin && (
                <Users users={users} setUsers={setUsers} isAdmin={isAdmin} />
              )
            }
          />
          <Route
           path="/rated-movies/:username" 
           element={
            <UserRatedMovies />
           } 
           />
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
