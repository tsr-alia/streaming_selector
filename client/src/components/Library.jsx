import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Library = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetching the movie data from the API
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:27017/api/movies");
        const data = await response.json();
        setMovies(data); // Assuming your API returns an array of movie objects in `data.movies`
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
    <h2>Movies List</h2>
        <div className="container w-full mx-auto outerPadding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Library;