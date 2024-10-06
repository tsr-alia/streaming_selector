import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie }) => {
  // Carousel for streaming options
  // get an array with unique streaming services
  const uniqueStreamingOptions = Array.from(
    new Set(movie.streamingOptions.de.map((option) => option.service.id))
  ).map((id) =>
    movie.streamingOptions.de.find((option) => option.service.id === id)
  );
  // state to switch between options
  const [currentIndex, setCurrentIndex] = useState(0);
  // Handler to move to the next option
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + uniqueStreamingOptions.length) %
        uniqueStreamingOptions.length
    );
  };
  // Handler to move to the next option
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % uniqueStreamingOptions.length
    );
  };

  return (
    <section className="w-full min-h-96 rounded overflow-hidden shadow-lg bg-white flex flex-col">
      {/* Image on top of card */}
      <img
        className="w-full h-48 object-cover"
        src={movie.imageSet.horizontalBackdrop.w720}
        alt={`${movie.title} poster`}
      />
      {/* Information about movie  */}
      <section className="px-6 py-4 flex flex-col flex-grow min-h-80">
        <h3>{movie.title}</h3>
        <p className="flex-grow">{movie.overview}</p>
      </section>
      <section className="min-h-52 flex flex-col">
        <ul className="px-6 pb-4 font-semibold min-h-16">
          <li>Rating: {movie.rating}</li>
          <li>Year: {movie.releaseYear}</li>
        </ul>
        {/* Carousel of Steaming Options */}
        <section className=" py-4 font-semibold">
          <h4 className="px-6 pb-4 font-semibold">Watch now on:</h4>
          <div className="relative flex items-center px-2 min-h-24">
            {uniqueStreamingOptions.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 z-10 p-2 text-red hover:text-support"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}
            <ul className="flex flex-row items-center justify-center w-full gap-2">
              <li className="text-center">
                <a
                  href={uniqueStreamingOptions[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="max-w-20 p-2 rounded-3xl hover:bg-support transition duration-500"
                    src={
                      uniqueStreamingOptions[currentIndex].service.imageSet
                        .lightThemeImage
                    }
                    alt={uniqueStreamingOptions[currentIndex].service.name}
                  />
                </a>
              </li>
            </ul>
            {uniqueStreamingOptions.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 z-10 p-2 text-red hover:text-support"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

export default MovieCard;
