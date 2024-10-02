import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Question from './Question';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]); // fetched from API
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // user input
  const location = useLocation();

  // Fetch questions
  useEffect(() => {
    fetch('http://localhost:27017/api/questions/')
      .then(response => response.json())
      .then((data) => {
        setQuestions(data);
        // Set initial state based on route params (currentQuestionIndex and firstAnswer)
        if (location.state) {
          const { currentQuestionIndex, firstAnswer } = location.state;
          setCurrentQuestionIndex(currentQuestionIndex);
          const firstQuestionName = data[0].name;
          setAnswers({ [firstQuestionName]: firstAnswer });
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [location.state]);

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

  const findMovie = async (answers) => {
    try {
      console.log("findMovie: ", answers);
      const params = answers;
      const res = await axios.get('http://localhost:27017/api/movies/moviepicker', {params});
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
    <h2>Find My Movie</h2>
    <div className="flex-grow mx-auto
    ">
        {questions.length > 0 && (
        <Question
          key={currentQuestionIndex}  // Ensure the Question component re-renders on index change
          question={questions[currentQuestionIndex].question}
          name={questions[currentQuestionIndex].name}
          options={questions[currentQuestionIndex].options}
          type={questions[currentQuestionIndex].type}
          nextQuestion={handleNext}
          backQuestion={handleBack} // Pass back handler
          findMovie={findMovie}
          previousAnswer={answers[questions[currentQuestionIndex].name]} // Send the previous answer, if available
          isFirstQuestion={currentQuestionIndex === 0} // Disable back on first question
          isLastQuestion={currentQuestionIndex === questions.length-1}
        />
      )}
    </div>
    </>
  );
};

export default Quiz;