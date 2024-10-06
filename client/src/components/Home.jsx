import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  // state to manage rendering of Question component
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // fetch questions from database to use first question on the homepage
  useEffect(() => {
    fetch("http://localhost:27017/api/questions/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // navigate to quiz route and send the info of <Question /> via state object
  const handleAnswerChange = (answer) => {
    navigate("/quiz", {
      state: { currentQuestionIndex: 1, firstAnswer: answer },
    }); //tbd redux
  };

  return (
    // content of homepage
    <div className="bg-black bg-opacity-10 flex flex-row flex-wrap md:flex-nowrap lg:flex-column home">
      <div className="md:w-1/2 w-full bg-support bg-opacity-75 outerPadding">
        <h1>Not sure what movie to stream tonight?</h1>
        <h2>No need to scroll endlessly, let’s find out!</h2>
        <p>
          Take our interactive quiz to discover the perfect film for your mood
          and genre preferences.
        </p>
        <p>Start by telling us something about your mood today!</p>
      </div>
      <div className="md:w-1/2 w-full outerPadding bg-red bg-opacity-50">
        <div className="w-full mx-auto">
          {/* render question component for first question */}
          {questions.length > 0 && (
            <Question
              key={0}
              question={questions[0].question}
              name={questions[0].name}
              options={questions[0].options}
              type={questions[0].type}
              nextQuestion={handleAnswerChange}
              isFirstQuestion={true}
              isLastQuestion={false}
              isQuizPreview={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
