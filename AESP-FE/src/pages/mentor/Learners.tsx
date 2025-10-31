import React from "react";
import { Link } from "react-router-dom";

// Component
const Learners: React.FC = () => {
  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-indigo-200 to-blue-900 font-[Poppins] flex flex-col">
      {/* header */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          My Learners
        </h1>
        <Link
          to="/mentor/dashboard"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* nội dung  */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">👥</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            No Learners Assigned
          </h2>
          <p className="text-gray-500">
            You currently have no learners assigned to you. When learners are
            assigned, they will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Learners;
