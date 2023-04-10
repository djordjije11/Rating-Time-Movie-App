import { BrowserRouter, Route, Routes} from "react-router-dom";
import React, { useState } from 'react';
import NavBar from "./NavBar";
import Home from "./Home";
import '../App.css';


function App() {
  //const [token, setToken] = useState();
  //if(!token) {
  //  return <Login setToken={setToken} />
  //}
  const [movies, setMovies] = useState([]);
  return (
    
   <BrowserRouter>
    <NavBar />
    <Routes>
        <Route
          element={<Home movies={movies} setMovies={setMovies} />}
          path={"/"}
        />
       
      </Routes>


   </BrowserRouter>
  );
}

export default App;
