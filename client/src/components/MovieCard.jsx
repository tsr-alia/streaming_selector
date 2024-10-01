import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={movie.imageSet.verticalBackdrop.w600 ? movie.imageSet.verticalBackdrop.w600 : movie.imageSet.verticalPoster.w600} 
        alt={`${movie.title} poster`}
      />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
        <p className="text-black text-base">{movie.overview}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-white rounded-full py-1 text-sm font-semibold text-black-700 mr-2 mb-2">
          Rating: {movie.rating}
        </span><br/>
        <span className="inline-block bg-white rounded-full py-1 text-sm font-semibold text-black mr-2 mb-2">
          Year: {movie.releaseYear}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;