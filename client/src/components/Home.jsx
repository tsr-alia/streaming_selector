import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from "./Question"; // Assuming Question is in the components folder

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

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

  const handleAnswerChange = (answer) => {
    navigate("/quiz", { state: { currentQuestionIndex: 1, firstAnswer: answer } }); //tbd redux
  };

  return (
    <div className="bg-red bg-opacity-50">
      <div className="home">
        <h1>Not sure what movie to stream tonight?</h1>
        <p>No need to scroll endlessly, let’s find out!</p>
        <p>
          Take our interactive quiz to discover the perfect film for your mood
          and genre preferences.
        </p>
      </div>
      <div>
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
        {/* <button onClick={handleStartQuiz} className="bg-blue-500 text-white py-2 px-4 mt-4">
          Start the Quiz
        </button> */}
      </div>
    </div>
  );
};

export default Home;