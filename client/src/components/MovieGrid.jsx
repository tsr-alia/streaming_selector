import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetching the movie data from the API
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:27017/api/movies");
        const data = await response.json();
        setMovies(data.movies); // Assuming your API returns an array of movie objects in `data.movies`
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto outerPadding">
      <h1 className="text-4xl font-bold mb-6">Movies List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;