import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Question = ({
  name,
  question,
  options,
  type,
  nextQuestion,
  backQuestion,
  previousAnswer,
  isFirstQuestion,
  isLastQuestion,
  isQuizPreview,
  isOptional,
}) => {
  // state for storing the user input to be set in Quiz
  const [selectedAnswer, setSelectedAnswer] = useState(
    type === "checkbox" ? [] : ""
  );
  const [isAnswered, setIsAnswered] = useState(false); // To track if any option in the question is selected

  // Reset selectedAnswer when the next question is rendered
  useEffect(() => {
    setSelectedAnswer(type === "checkbox" ? [] : "");
  }, [name, type]);

  // Populate previous answer when going back to a question
  useEffect(() => {
    if (previousAnswer) {
      setSelectedAnswer(previousAnswer); // Set the previous answer if it exists
    }
  }, [previousAnswer]);

  // Update the isAnswered state whenever selectedAnswer changes
  useEffect(() => {
    if (
      (type === "radio" && selectedAnswer !== "") ||
      (type === "checkbox" && selectedAnswer.length > 0)
    ) {
      setIsAnswered(true);
    } else {
      setIsAnswered(false);
    }
  }, [selectedAnswer, type]);

  // sets the selected answer as soon as there is a change in input
  const handleInputChange = (e) => {
    const { value, checked } = e.target;
    if (type === "radio") {
      setSelectedAnswer(value); // For radio, directly set the selected value
    } else if (type === "checkbox") {
      // For checkbox, use a callback to ensure the latest state is handled correctly
      setSelectedAnswer((prevSelectedAnswers) => {
        if (checked) {
          return [...prevSelectedAnswers, value]; // Add to array if checked
        } else {
          return prevSelectedAnswers.filter((answer) => answer !== value); // Remove from array if unchecked
        }
      });
    }
  };

  // sends the selected answers to the Quiz component and goes to the next question
  const handleSubmit = () => {
    nextQuestion(selectedAnswer); // Pass the current selectedAnswer to function in Quiz component that saves the selectedAnswer and renders the next question
  };

  const handleBack = () => {
    backQuestion(selectedAnswer); // Pass the current selectedAnswer to function in Quiz component that goes back to render the question before
  };

  // trying to debug 5 / 25 error
  // useEffect(() => {
  //   console.log(selectedAnswer);
  //   console.log(selectedAnswer === "5");
  //   console.log(typeof options[1].value);
  // }, [selectedAnswer]);

  return (
    <div className="p-2 sm:max-w-lg w-full mx-auto text-center flex flex-start flex-col outerPadding">
      <h3 className="moviePicker bg-black">{question}</h3>
      <form className="moviePicker">
        {options.map((option, index) => (
          <label
            key={index}
            htmlFor={option.value}
            className={`flex items-center justify-center space-x-2 text-center cursor-pointer w-full 
              ${
                selectedAnswer === option.value ||
                selectedAnswer.includes(option.value)
                  ? "bg-red"
                  : "bg-black"
              }
              `}
          >
            <input
              id={option.value}
              type={type}
              value={option.value}
              onChange={handleInputChange}
              className="hidden"
              name={name}
              checked={
                type === "radio"
                  ? selectedAnswer === option.value
                  : selectedAnswer.includes(option.value)
              }
            />
            <span>{option.text}</span>
          </label>
        ))}
      </form>
      <div className="flex justify-start">
        {/* Back Button */}
        {!isFirstQuestion && (
          <button onClick={handleBack} className="back">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        )}
      </div>
      {/* Next Button */}
      <div className="flex justify-end mt-4">
        {(isAnswered || isOptional) && (
          <button
            onClick={handleSubmit}
            className={isLastQuestion || isQuizPreview ? "last" : "next"}
          >
            {isLastQuestion
              ? "Find my Movie"
              : isQuizPreview
              ? "Start the Quiz"
              : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
