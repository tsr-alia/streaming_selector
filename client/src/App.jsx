import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; // Import Home from a separate file
import Quiz from "./components/Quiz";
import Library from "./components/Library";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";


function App() {
  const location = useLocation();

  // Define background images for different routes
  const backgrounds = {
    '/': 'url(/images/curtains.png)', // Home background
    '/movie_library': 'url(/images/moviecollection2.jpg)', // Library background
    '/quiz': 'url(/images/movies.jpg)', // Quiz background
    // Add more routes as needed
  };
  // Determine the current background based on the route, fallback to a default if none matches
  const currentBackground = backgrounds[location.pathname] || 'url(/images/curtains.png)';

   return (
    <>
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center relative" 
      style={{ backgroundImage: currentBackground }}
    >
      {/* Overlay div with 75% opacity */}
      <div className="absolute inset-0 bg-black opacity-75 level-0" ></div>
      {/* Menu */}
      <div className="flex flex-col relative min-h-screen">
        <Navbar />
       
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie_library" element={<Library />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
          {/* <Route path="/quiz/:id" element={<Quiz />}></Route> */}
          {/* Profile / Login */}
          {/*  About */}
        </Routes>
        
     </div>
    </div>
    </>
  );
}

export default App;
