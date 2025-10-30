import React from "react";
import { Link } from "react-router-dom"; // Back

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins]">
      {/* title */}
      <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Your Profile & Goals
        </h1>
        <Link
          to="/learner/dashboard"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Form */}
      <form className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
        {/* thông tin cá nhân */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            />
          </div>
        </div>

        {/* mục tiêu học tập */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Learning Goals
        </h2>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Goal
            </label>
            <select className="w-full border border-pink-200 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-pink-400">
              <option>Practice for an interview</option>
              <option>Travel abroad</option>
              <option>Prepare for IELTS/TOEIC</option>
              <option>General improvement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Weekly Target
            </label>
            <select className="w-full border border-pink-200 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-pink-400">
              <option>3 days / week</option>
              <option>5 days / week</option>
              <option>7 days / week</option>
            </select>
          </div>
        </div>

        {/* Save */}
        <button
          type="submit"
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-3 text-lg transition shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
