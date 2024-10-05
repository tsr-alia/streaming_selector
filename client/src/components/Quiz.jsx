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
  const [quizFinished, setQuizFinished] = useState(false);
  const [restarted, setRestarted] = useState(false);
  // states for handling movie results
  const [resultsArray, setResultsArray] = useState([]);
  const [currentResultsIndex, setCurrentResultsIndex] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);

  // Fetch questions
  useEffect(() => {
    fetch("http://localhost:27017/api/questions/")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setRestarted(false);
        // Set initial state based on route params (currentQuestionIndex and firstAnswer)
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
      // This is where we handle the "Find my Movie" click
      // TBD: return this for the filter
      console.log("Before findMovie");
      (async () => {
        try {
          const result = await findMovie(answers);
          console.log("after findmovie");
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

  // send answers as search parameters to database and get an array of results
  const findMovie = async (answers) => {
    setLoadingInitial(true);
    setError(null);
    try {
      console.log("findMovie: ", answers);
      const params = answers;
      const res = await axios.get(
        "http://localhost:27017/api/movies/moviepicker",
        { params }
      );
      setResultsArray(res.data);
      setCurrentResultsIndex(0);
      if (res.data.length > 0) {
        fetchMovieById(res.data[0].id);
      }
      setQuizFinished(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoadingInitial(false);
    }
  };

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

  // Handle "Next Result" button
  const nextResult = () => {
    const nextIndex = currentResultsIndex + 1;
    if (nextIndex < resultsArray.length) {
      setCurrentResultsIndex(nextIndex);
      fetchMovieById(resultsArray[nextIndex].id);
    } else {
      fetchMovieById(resultsArray[0].id);
    }
  };

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
      <div
        className="flex-grow mx-auto
    "
      >
        {questions.length > 0 && !quizFinished && (
          <Question
            key={currentQuestionIndex} // Ensure the Question component re-renders on index change
            question={questions[currentQuestionIndex].question}
            name={questions[currentQuestionIndex].name}
            options={questions[currentQuestionIndex].options}
            type={questions[currentQuestionIndex].type}
            nextQuestion={handleNext}
            backQuestion={handleBack} // Pass back handler
            findMovie={findMovie}
            previousAnswer={answers[questions[currentQuestionIndex].name]} // Send the previous answer, if available
            isFirstQuestion={currentQuestionIndex === 0} // Disable back on first question
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            isOptional={questions[currentQuestionIndex].optional}
          />
        )}

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

        {currentResult && (
          <>
            {loadingDetail ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white level-3">
                <p className="text-white">Loading data...</p>
              </div>
            ) : (
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
