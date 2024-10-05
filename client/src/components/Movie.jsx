import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faRotateLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Movie = ({ movie, userInput, restart, newResult}) => {
  // ?? do I need state for that?
  const [moodTags, setMoodTags] = useState([]);
  const [occasionTags, setOccasionTags] = useState([]);
  const [genreTags, setGenreTags] = useState([]);
  const [additionalTags, setAdditionalTags] = useState([]);
  const [yearOverlap, setYearOverlap] = useState(false);

  // Build object for showing tags
  useEffect(() => {
    let newTags = [];
    for (let mood of movie.mood) {
      let moodTag = {};
      moodTag.title = capitalizeFirstLetter(mood);
      if (userInput.mood.includes(mood)) {
        moodTag.overlap = true;
      } else {
        moodTag.overlap = false;
      }
      newTags.push(moodTag);
    }
    setMoodTags(newTags);
    newTags = [];

    for (let occasion of movie.occasion) {
      let tag = {};
      tag.title = capitalizeFirstLetter(occasion);
      if (userInput.occasion.includes(occasion)) {
        tag.overlap = true;
      } else {
        tag.overlap = false;
      }
      newTags.push(tag);
    }
    setOccasionTags(newTags);
    newTags = [];

    for (let genre of movie.genres) {
      let tag = {};
      tag.title = genre.name;
      if (userInput.genre.includes(genre.id)) {
        tag.overlap = true;
      } else {
        tag.overlap = false;
      }
      newTags.push(tag);
    }
    setGenreTags(newTags);
    newTags = [];

    if (movie.tags.length !== 0) {
      for (let additionalTag of movie.tags) {
        let tag = {};
        tag.title = "#" + additionalTag;
        if (userInput.tags.includes(additionalTag)) {
          tag.overlap = true;
        } else {
          tag.overlap = false;
        }
        newTags.push(tag);
        console.log(newTags[0].title);
      }
    }
    setAdditionalTags(newTags);
    newTags = [];

    let releaseYearMin = new Date().getFullYear() - Number(userInput.releaseYear);
      if (movie.releaseYear !== "noRestriction" && movie.releaseYear >= releaseYearMin) {
       setYearOverlap(true); 
      }
  }, [movie, userInput]);

  //   console.log(newTags);
  //   setTags(newTags);
  // }, [movie, userInput])

  const uniqueStreamingOptions = Array.from(
    new Set(movie.streamingOptions.de.map((option) => option.service.id))
  ).map((id) =>
    movie.streamingOptions.de.find((option) => option.service.id === id)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
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
    <>
      <div className="relative inset-0 level-3 w-full h-full bg-black bg-opacity-75 outerPadding">
        <h2 className="font-montserrat text-xl font-semibold mb-4">
          We found a Movie for you!
        </h2>
    
        <div className="relative w-full min-h-screen flex rounded overflow-hidden shadow-lg bg-white flex-col sm:flex-row">
          {/* Sidebar with Vertical Image and Streaming Links*/}
          <div className="sm:w-1/3">
            <img
              src={movie.imageSet.verticalPoster.w720}
              alt="Sidebar"
              className="w-full "
            />
            {/* Streaming Links (tbd: make into component) */}
            <h4 className="px-6 pt-4 font-semibold text-center">Watch now on</h4>
            <div className="relative flex items-center px-2 min-h-24">
              {uniqueStreamingOptions.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-0 level-1 p-2 text-red hover:text-support"
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
                      className="max-w-20 p-2 rounded-3xl text-black fill-current hover:bg-support transition duration-500"
                      src={
                        uniqueStreamingOptions[currentIndex].service.imageSet
                          .lightThemeImage
                      }
                      alt={uniqueStreamingOptions[currentIndex].service.name}
                    />
                    {/* {`max-w-20 p-2 rounded hover:bg-${uniqueStreamingOptions[currentIndex].themeColorCode}`} */}
                  </a>
                </li>
              </ul>
              {uniqueStreamingOptions.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-0 level-1 p-2 text-red hover:text-support"
                >
                  <FontAwesomeIcon className="ml-2" icon={faChevronRight} />
                </button>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="sm:w-2/3 w-full p-6 flex flex-col">
            <h3 className="mb-0">{movie.title}</h3>
            <p className={`mb-4 ${yearOverlap ? 'text-red' : 'text-black'}`}>{movie.releaseYear}{yearOverlap && <FontAwesomeIcon className="ml-2" icon={faCheck} />}</p>
            <p className="mb-4">{movie.overview}</p>


            {/* Tags */}
            <section className="mb-4">
              {/* Genre and Additional Tags */}
              <ul className="flex flex-wrap gap-2 mb-4">
                {genreTags.map((tag, index) => (
                  <li
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full text-white ${
                      tag.overlap
                        ? "bg-red font-semibold"
                        : "bg-support opacity-75"
                    } `}
                  >
                    {tag.title}
                    {tag.overlap && <FontAwesomeIcon className="ml-2" icon={faCheck} />}
                  </li>
                ))}
              </ul>
              {movie.tags.length !== 0 && (
                <ul className="flex flex-wrap gap-2 mb-4">
                  {additionalTags.map((tag, index) => (
                    <li
                      key={index}
                      className={`px-3 py-1 text-sm rounded-full text-white italic ${
                        tag.overlap
                          ? "bg-red font-semibold"
                          : "bg-support opacity-75"
                      } `}
                    >
                      {tag.title}
                      {tag.overlap && <FontAwesomeIcon className="ml-2" icon={faCheck} />}
                    </li>
                  ))}
                </ul>
            )}
             </section>
             {/* Mood and Occasion */}
            <section className="mb-4">
              {/* <h4 className="mb-2">Watch this movie when you are feeling</h4> */}
              <ul className="flex flex-wrap gap-2">
                {moodTags.map((tag, index) => (
                  <li
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full text-white ${
                      tag.overlap
                        ? "bg-red font-semibold"
                        : "bg-support opacity-75"
                    } `}
                  >
                    {tag.title}
                    {tag.overlap && <FontAwesomeIcon className="ml-2" icon={faCheck} />}
                  </li>
                ))}
              </ul>
            </section>
            {/* Occasion Tags */}
            <section className="mb-8">
              {/* <h4 className="mb-2 uppercase">Suitable for</h4> */}
              <ul className="flex flex-wrap gap-2">
                {occasionTags.map((tag, index) => (
                  <li
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full text-white ${
                      tag.overlap
                        ? "bg-red font-semibold"
                        : "bg-support opacity-75"
                    } `}
                  >
                    {tag.title}
                    {tag.overlap && <FontAwesomeIcon className="ml-2" icon={faCheck} />}
                  </li>
                ))}
              </ul>
            </section>
            {/* Buttons */}
            <section className="flex flex-wrap">
              <button onClick={newResult} className="px-4 py-2 rounded-xl bg-red text-white hover:bg-black hover:bg-opacity-50 border-white border-2 transition duration-300">
              Get another suggestion!<FontAwesomeIcon className="ml-2" icon={faArrowRight} />
              </button>
              <button onClick={restart} className="px-4 py-2 rounded-xl bg-support text-white hover:bg-black hover:bg-opacity-50 border-white border-2 transition duration-300 font-semibold">
              Restart the Quiz!<FontAwesomeIcon className="ml-2" icon={faRotateLeft} />
              </button>
            </section>
          </div>
   
        </div>
        
      </div>
    </>
  );
};

export default Movie;
