import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from 'axios';
import FilterList from "./FilterList";

const Library = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    // Fetching the movie data from the API
    const fetchMovies = async () => {
      try {
        const params = filter;
        const res = await axios.get('http://localhost:27017/api/movies', {params});
        setMovies(res.data); // Assuming your API returns an array of movie objects in `data.movies`
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [filter]);
// grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full
  return (
    <>
    <h2>Movies List</h2>
        <div className="outerPadding">
        <FilterList />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Library;