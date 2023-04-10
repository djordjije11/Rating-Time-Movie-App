import { BrowserRouter, Route, Routes} from "react-router-dom";
import React, { useState } from 'react';
import NavBar from "./NavBar";
import Home from "./Home";
import '../App.css';
import Login from "./Login";


function App() {
 
  const [movies, setMovies] = useState([]);
  return (
   
   <BrowserRouter>
    <NavBar />
    <Routes>

        <Route
          element={<Home movies={movies} setMovies={setMovies} />}
          path={"/"}
        />
        {/* <Route path="/login" element={<Login />} /> */}
        
      </Routes>


   </BrowserRouter>
  );
}

export default App;
