import React from "react";
import { Link } from "react-router-dom";

// Component
const Practice: React.FC = () => {
  const startPractice = () => {
    alert("Starting a random conversation with AI...");
  };

  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins] flex flex-col">
      {/* title */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Speaking Practice
        </h1>
        <Link
          to="/learner/dashboard" // back to dashboard
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* luyện tập */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🎤</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Ready to practice your speaking?
          </h2>
          <p className="text-gray-500 mb-8">
            Click the button below to start a random conversation with our AI.
          </p>
          <button
            onClick={startPractice}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-3 px-8 text-lg transition shadow-md"
          >
            Start Practice Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
