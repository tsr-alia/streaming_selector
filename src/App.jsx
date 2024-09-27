import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; // Import Home from a separate file
import Quiz from "./components/Quiz";
import Library from "./components/Library";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";


function App() {
  const location = useLocation();

  // Define background images for different routes
  const backgrounds = {
    '/': 'url(/images/curtains.png)', // Home background
    '/movie_library': 'url(/images/moviecollection.jpg)', // Library background
    '/quiz': 'url(/images/movies.jpg)', // Quiz background
    // Add more routes as needed
  };
  // Determine the current background based on the route, fallback to a default if none matches
  const currentBackground = backgrounds[location.pathname] || 'url(/images/curtains.png)';

  // const Home = () => {
  //   const [questions, setQuestions] = useState([]);
  //   const [firstAnswer, setFirstAnswer] = useState(null); // Store the answer to the first question
  //   const navigate = useNavigate();
  //   console.log("Outside useEffect");

  //   useEffect(() => {
  //     console.log("Inside useEffect");
  //     fetch('http://localhost:3000/questions')
  //       .then((response) => {
  //         console.log('Response:', response);
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log('Data fetched:', data);
  //         setQuestions(data);
  //       })
  //       .catch((error) => console.error('Error fetching questions:', error));
  //   }, [location.pathname]);

    

  //   const handleStartQuiz = () => {
  //     // Navigate to the quiz page, passing the first answer and starting from the second question
  //     navigate('/quiz', {
  //       state: { currentQuestionIndex: 1, firstAnswer }
  //     });
  //   };

  //   const handleAnswerChange = (answer) => {
  //     setFirstAnswer({[questions[currentQuestionIndex].name]: firstAnswer}); // Store the answer to the first question
  //   };


  //   return (
  //     <>
  //       <div className="home">
  //         <h1>Not sure what movie to stream tonight?</h1>
  //         <p>No need to scroll endlessly, let’s find out!</p>
  //         <p>
  //           Take our interactive quiz to discover the perfect film for your mood
  //           and genre preferences. And the best part: We’ll find a movie that’s
  //           actually available to watch on your home streaming services.
  //         </p>
  //       </div>
  //       <div>
  //       <div>
  //       <Question
  //         key={0}
  //         question={questions[0].question}
  //         name={questions[0].name}
  //         options={questions[0].options}
  //         type={questions[0].type}
  //         nextQuestion={handleAnswerChange} // Capture the answer, but no next question
  //         isFirstQuestion={true}
  //         isLastQuestion={false}
  //       />
  //         <button onClick={handleStartQuiz} className="bg-blue-500 text-white py-2 px-4 mt-4">
  //           Start the Quiz
  //         </button>
  //       </div>
  //         {/* <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
  //           <h2 className="text-xl font-bold mb-4">How are you today?</h2>
  //           <form>
  //             <label htmlFor="happy" className="flex items-center space-x-2">
  //               <input
  //                 id="happy"
  //                 type="radio"
  //                 value="happy"
  //                 // onChange={handleInputChange}
  //                 className="form-checkbox text-indigo-600 h-4 w-4"
  //                 name="mood"
  //                 checked="false"
  //               />
  //               <span>Happy</span>
  //             </label>
  //             <label htmlFor="sad" className="flex items-center space-x-2">
  //               <input
  //                 id="sad"
  //                 type="radio"
  //                 value="sad"
  //                 // onChange={handleInputChange}
  //                 className="form-checkbox text-indigo-600 h-4 w-4"
  //                 name="mood"
  //                 checked="false"
  //               />
  //               <span>Sad</span>
  //             </label>
  //             <label htmlFor="excited" className="flex items-center space-x-2">
  //               <input
  //                 id="excited"
  //                 type="radio"
  //                 value="excited"
  //                 // onChange={handleInputChange}
  //                 className="form-checkbox text-indigo-600 h-4 w-4"
  //                 name="mood"
  //                 checked="false"
  //               />
  //               <span>Excited</span>
  //             </label>
  //             <label htmlFor="bored" className="flex items-center space-x-2">
  //               <input
  //                 id="bored"
  //                 type="radio"
  //                 value="bored"
  //                 // onChange={handleInputChange}
  //                 className="form-checkbox text-indigo-600 h-4 w-4"
  //                 name="mood"
  //                 checked="false"
  //               />
  //               <span>Bored</span>
  //             </label>
  //           </form>
          
  //           <button
  //             // onClick={}
  //             className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded"
  //           >
  //             <Link to="/quiz/:1/start/:firstAnswer">Start the Quiz!</Link>
  //           </button>
  //         </div> */}
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
    <div 
      className="min-h-screen bg-cover bg-center relative" 
      style={{ backgroundImage: currentBackground }}
    >
      {/* Overlay div with 75% opacity */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" ></div>
      {/* Menu */}
      <div className="flex flex-col relative z-10 min-h-screen">
        {/* <nav className="bg-black bg-opacity-25">
          <li>
            <Link to="/">
              <h1>Streamning Selector</h1>
            </Link>
          </li>
          <li>
            <Link to="/movie_library">Movie Library</Link>
          </li>
          <li>Login</li>
          <li>
            <Link to="/quiz">Find My Movie</Link>
          </li>
        </nav> */}
        <Navbar />
       
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie_library" element={<Library />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
          {/* <Route path="/quiz/:id" element={<Quiz />}></Route> */}
        </Routes>
        
     </div>
    </div>
    </>
  );
}

export default App;
