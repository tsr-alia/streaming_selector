import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";
import Movie from "./Movie";
import axios from "axios";

const Quiz = () => {
  // states for rendering questions
  const [questions, setQuestions] = useState([]); // fetched from API
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // states/hooks for managing user input from questions
  const location = useLocation();
  const [answers, setAnswers] = useState({}); // user input
  // states for handling movie results
  const [resultsArray, setResultsArray] = useState([]);
  const [currentResultsIndex, setCurrentResultsIndex] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  // states for conditional rendering when loading movies
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [restarted, setRestarted] = useState(false);

  // Fetch questions from database
  useEffect(() => {
    fetch("http://localhost:27017/api/questions/")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setRestarted(false);
        // When the user is accessing the quiz route via the quiz at the Home component, set currentQuestion and firstAnswer accordingly
        if (location.state) {
          const { currentQuestionIndex, firstAnswer } = location.state;
          setCurrentQuestionIndex(currentQuestionIndex);
          const firstQuestionName = data[0].name;
          setAnswers({ [firstQuestionName]: firstAnswer });
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [location.state, restarted]);

  // log user input in answers and render next questions
  const handleNext = (answer) => {
    const currentQuestionName = questions[currentQuestionIndex].name;
    setAnswers({
      ...answers,
      [currentQuestionName]: answer,
    });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // fetch array of results when it's the last question with findMovie
      (async () => {
        try {
          const result = await findMovie(answers);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  // log user input in answers and go back to question before
  const handleBack = (answer) => {
    const currentQuestionName = questions[currentQuestionIndex].name;
    setAnswers({
      ...answers,
      [currentQuestionName]: answer,
    });
    console.log(currentQuestionIndex, answers);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // send user input as search parameters to database and get an array of results
  const findMovie = async (answers) => {
    setLoadingInitial(true);
    setError(null);
    try {
      const params = answers;
      const res = await axios.get(
        "http://localhost:27017/api/movies/moviepicker",
        { params }
      );
      // put results in an array and set index to 0
      setResultsArray(res.data);
      setCurrentResultsIndex(0);
      if (res.data.length > 0) {
        fetchMovieById(res.data[0].id);
      }
      // disable rendering of Question component
      setQuizFinished(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoadingInitial(false);
    }
  };

  // based on the array of movie results, get full data of movie by id
  const fetchMovieById = async (id) => {
    setLoadingDetail(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:27017/api/movies/movie/${id}`
      );
      console.log(res.data);
      setCurrentResult(res.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
      // setQuizFinished(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Handle "Next Result" button, once the Movie component is rendered, the user can get the next result in the array of movies
  const nextResult = () => {
    const nextIndex = currentResultsIndex + 1;
    if (nextIndex < resultsArray.length) {
      setCurrentResultsIndex(nextIndex);
      fetchMovieById(resultsArray[nextIndex].id);
    } else {
      // if nothing left, go back to the beginning of the array
      fetchMovieById(resultsArray[0].id);
    }
  };

  // Handle "Restart the Quiz" button, set every state to it's initial value and reload quiz route
  const navigate = useNavigate();
  const handleRestart = () => {
    setAnswers({});
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({}); // user input
    setQuizFinished(false);
    setResultsArray([]);
    setCurrentResultsIndex(0);
    setCurrentResult(null);
    setLoadingInitial(false);
    setLoadingDetail(false);
    setError(null);
    setRestarted(true);
    navigate("/quiz", { replace: true }); // Navigate to the same route
  };

  return (
    <>
      {!currentResult && <h2 className="outerPadding">Find My Movie</h2>}
      <div className="flex-grow mx-auto">
        {/* render question component when quiz is not finished */}
        {questions.length > 0 && !quizFinished && (
          <Question
            key={currentQuestionIndex} // Ensure the Question component re-renders on index change
            question={questions[currentQuestionIndex].question}
            name={questions[currentQuestionIndex].name}
            options={questions[currentQuestionIndex].options}
            type={questions[currentQuestionIndex].type}
            // pass functions to question component to fire them from there
            nextQuestion={handleNext}
            backQuestion={handleBack}
            findMovie={findMovie}
            previousAnswer={answers[questions[currentQuestionIndex].name]} // Send the previous answer, if available
            isFirstQuestion={currentQuestionIndex === 0} // Disable back on first question
            isLastQuestion={currentQuestionIndex === questions.length - 1} // renders the "Finish" button
            isOptional={questions[currentQuestionIndex].optional} // renders the "Next" button even when no answer is given
          />
        )}
        {/* Loading Quiz Results and Error */}
        {loadingInitial && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white level-3">
            <p className="text-white">Loading results...</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white level-3">
            <p className="text-red">{error}</p>
          </div>
        )}
        {/* Loading Current Result in the Movie component */}
        {currentResult && (
          <>
            {loadingDetail ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white level-3">
                <p className="text-white">Loading data...</p>
              </div>
            ) : (
              // pass current result and user answers and functions to Movie
              <Movie
                movie={currentResult}
                userInput={answers}
                restart={handleRestart}
                newResult={nextResult}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
