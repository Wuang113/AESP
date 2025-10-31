import React from "react";
import { Link } from "react-router-dom";

// Component
const Reports: React.FC = () => {
  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins] flex flex-col">
      {/* Title */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Your Progress Reports
        </h1>
        <Link
          to="/learner/dashboard"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
      {/* "Coming Soon" */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Feature Coming Soon!
          </h2>
          <p className="text-gray-500">
            The reports and analytics page is under construction. Please check
            back later!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
