import { useState, useEffect } from "react";
import { API_URL } from '../config';

const About = () => {

  const [counts, setCounts] = useState({movies: 0, genres: 0, services: 0});

  useEffect(() => {
    fetch(`${API_URL}movies/count`)
      .then((response) => response.json())
      .then((data) => {
        setCounts(data);
      })
      .catch((error) => console.error("Error fetching counts:", error));
  }, []);

  return (
    <>
    <div className="bg-black bg-opacity-25 about">
    <h2 className="outerPadding">About</h2>
      <section className="min-h-full flex flex-row flex-wrap">
        <section className="md:w-1/2 xl:w-2/3 w-full bg-opacity-75 outerPadding">
          <div className=" bg-opacity-25 min-h-full">
            
            <div className="my-8 outerPadding bg-opacity-75 rounded-xl bg-black text-white">
              <p className="text-white">With the Streaming Selector, I aim to create the film website I've always wanted to have: A tool to help you decide what movie to watch. All you have to do is  answer a few questions and in the end you get a link to stream a movie right away. 
              </p>
              <p className="text-white">
                Besides endlessly scrolling through your "Want to Watch" lists and not being able to decide on a film, it can also be really frustrating to finally find something to watch only to realize that it is not available on any of your streaming services.   What sets this website apart from similar tools and quizzes is that, on top of matching movies against your preferences and mood, the Streaming Selector searches for movies that are currently available on your streaming platforms. Once you get your result, you can just click on a link and start watching.
              </p>
              <p className="text-white">This website is a work in progress, heavily influenced by <a href="https://pickamovieforme.com/" target="_blank">pickamovieforme.com/</a>. The quiz and filtering process will be refined, more features like user accounts and more personal and playful questions will be added.</p>
            </div>
          </div>
        </section>
        <section className="md:w-1/2 xl:w-1/3 w-full outerPadding">
        <div className="my-8 outerPadding bg-opacity-75 rounded-xl bg-support">
            <h3>Currently the database consists of:</h3>
            <ul>
              <li>{counts.movies} movies across</li>
              <li>{counts.genres} genres, available on</li>
              <li>{counts.services} different streaming services</li>
            </ul>
            </div>
            <h3 className="text-white">Where do you get the movie data?</h3>
            <p className="text-white">The collection of movies currently available is based on the top ranked films from the <a href="https://www.movieofthenight.com/" target="_blank">Movie of the Night</a> Streaming Availability API. The data from the API is tagged with the help of AI to match it to your current mood, occasion for watching and other preferences. With time, more and more movies will be added to the database.</p>
            
        </section>
      </section>
      </div>
    </>
  );
};

export default About;
