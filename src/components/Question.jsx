import React, { useState, useEffect } from "react";

const Question = ({ name, question, options, type, nextQuestion, backQuestion, previousAnswer, isFirstQuestion, isLastQuestion, isQuizPreview }) => {
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
    const { value, checked } = e.target;

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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <form>
        {options.map((option, index) => (
          <label
            key={index}
            htmlFor={option.value}
            className="flex items-center space-x-2"
          >
            <input
              id={option.value}
              type={type}
              value={option.value}
              onChange={handleInputChange}
              className="form-checkbox text-indigo-600 h-4 w-4"
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
      <div className="flex justify-between mt-4">
        {!isFirstQuestion && (
          <button
            onClick={handleBack}
            className="bg-gray-400 text-white py-2 px-4 rounded"
          >
            Back
          </button>
        )}
        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white py-2 px-4 rounded"
          >
            {isLastQuestion ? "Find my Movie" : isQuizPreview ? "Start the Quiz" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
