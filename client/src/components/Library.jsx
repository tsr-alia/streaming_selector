import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import FilterList from "./FilterList";
import { API_URL } from '../config';

const Library = () => {
  // state for movies to be shown and currently selected filters
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState([]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Fetching the movie data from the API and sorting them in random order
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const params = filters;
        const res = await axios.get(`${API_URL}movies/`, {
          params,
        });
        setMovies(res.data.sort((a, b) => 0.5 - Math.random()));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [filters]);

  return (
    <>
      <h2 className="outerPadding">Movies List</h2>
      <div className="outerPadding min-h-screen">
        <FilterList handleFiltering={updateFilters} />
        {/* Show when no movies available */}
        {movies.length === 0 ? (
          <>
            <section className="mt-6">
              <h3 className="text-white">
                Sorry, we couldn't find any movies!
              </h3>
              <h4 className="text-red">
                We are working on growing our selection. In the meantime, best
                try again with different filters.
              </h4>
            </section>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.length < 0}
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Library;
