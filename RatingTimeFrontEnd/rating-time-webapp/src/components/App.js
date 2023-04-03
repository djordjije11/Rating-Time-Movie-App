import { BrowserRouter} from "react-router-dom";
import React, { useState } from 'react';
import NavBar from "./NavBar";
import Login from "./Login";
import '../App.css';


function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
   <BrowserRouter>
    <NavBar />
    


   </BrowserRouter>
  );
}

export default App;
