import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

// Component trang chính
const MentorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-indigo-200 to-blue-900 font-[Poppins]">
      {/* Header */}
      <header className="flex justify-between items-center mb-5 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Mentor Dashboard
        </h1>

        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md">
          <FaSignOutAlt />
          Log Out
        </button>
      </header>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* My Learners */}
        <Link
          to="/mentor/learners"
          className="block bg-white p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 hover:scale-105"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 bg-blue-100 text-blue-600">
            👥
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            My Learners
          </h3>
          <p className="text-sm text-gray-600">
            View, assess, and manage your students.
          </p>
        </Link>

        {/* My Schedule */}
        <Link
          to="/mentor/schedule"
          className="block bg-white p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 hover:scale-105"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 bg-blue-100 text-blue-600">
            📅
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            My Schedule
          </h3>
          <p className="text-sm text-gray-600">
            Check your upcoming practice sessions.
          </p>
        </Link>

        {/* Resource Hub */}
        <Link
          to="/mentor/resources"
          className="block bg-white p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 hover:scale-105"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 bg-blue-100 text-blue-600">
            📚
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Resource Hub
          </h3>
          <p className="text-sm text-gray-600">
            Upload documents and create topics.
          </p>
        </Link>

        {/* My Profile */}
        <Link
          to="/mentor/profile"
          className="block bg-white p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 hover:scale-105"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 bg-blue-100 text-blue-600">
            👤
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            My Profile
          </h3>
          <p className="text-sm text-gray-600">
            Update your professional information.
          </p>
        </Link>
      </section>
    </div>
  );
};

export default MentorDashboard;
