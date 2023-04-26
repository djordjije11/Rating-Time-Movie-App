import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import "../App.css";
import Login from "./Login";
import RatedMovies from "./RatedMovies";

function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          element={
            <Home ratedMovies={ratedMovies} setRatedMovies={setRatedMovies} />
          }
          path={"/"}
        />
        <Route
          element={
            <RatedMovies
              ratedMovies={ratedMovies}
              setRatedMovies={setRatedMovies}
            />
          }
          path={"/rated-movies"}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
