import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const Question = ({ name, question, options, type, nextQuestion, backQuestion, findMovie, previousAnswer, isFirstQuestion, isLastQuestion, isQuizPreview }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(
    type === "checkbox" ? [] : ""
  );
  const [isAnswered, setIsAnswered] = useState(false); // To track if any answer is selected

  // Reset selectedAnswer when the question type or name changes
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
    if ((type === "radio" && selectedAnswer !== "") || (type === "checkbox" && selectedAnswer.length > 0)) {
      setIsAnswered(true);
    } else {
      setIsAnswered(false);
    }
  }, [selectedAnswer, type]);

  const handleInputChange = (e) => {
    const { value, checked, className } = e.target;

    if (type === 'radio') {
      setSelectedAnswer(value); // For radio, directly set the selected value
    } else if (type === 'checkbox') {
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

  const handleSubmit = () => {
    nextQuestion(selectedAnswer);  // Pass the current selectedAnswer to nextQuestion
  };

  const handleBack = () => {
    backQuestion(selectedAnswer);
  }

  return (
    <div className="p-2 sm:max-w-lg w-full text-center flex flex-start flex-col outerPadding">
      <h3 className="moviePicker bg-black">{question}</h3>
      <form className="moviePicker">
        {options.map((option, index) => (
          <label
            key={index}
            htmlFor={option.value}
            className={`flex items-center justify-center space-x-2 text-center w-full 
              ${selectedAnswer === option.value || selectedAnswer.includes(option.value) ? 'bg-red' : 'bg-black'}
              `
            }
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
          <button
            onClick={handleBack}
            className="back"
          >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
       
        )}
         </div>
        {/* Next Button */}
        <div className="flex justify-end mt-4">
        {isAnswered && (
          <button
            onClick={handleSubmit}
            className={isLastQuestion || isQuizPreview ? 'last' : 'next'}
          >
            {isLastQuestion ? "Find my Movie" : isQuizPreview ? "Start the Quiz" : "Next"}
          </button>

        )}
      </div>
    </div>
  );
};

export default Question;
