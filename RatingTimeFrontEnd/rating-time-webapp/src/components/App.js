import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import "../App.css";
import Login from "./Login";
import RatedMovies from "./RatedMovies";

function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isLoggedIn, setLoggedIn]= useState(false);

  const handleLogin =()=>{
    setLoggedIn(true);
    
  }
  return (
    <BrowserRouter>
         {isLoggedIn && <NavBar />}
         <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home ratedMovies={ratedMovies} setRatedMovies={setRatedMovies} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rated-movies"
          element={
            isLoggedIn ? (
              <RatedMovies
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
