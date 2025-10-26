import React from "react";
import { FaGoogle, FaApple, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins]">
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-10 text-center animate-fade-in">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
          Account Log In
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username or Email"
            required
            className="w-full border border-pink-200 rounded-lg px-5 py-3 text-lg focus:outline-none focus:border-pink-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-pink-200 rounded-lg px-5 py-3 text-lg focus:outline-none focus:border-pink-400 transition"
          />
          <button
            type="submit"
            className="mt-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-3 text-lg transition"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-between text-base mt-6">
          <a href="#" className="text-pink-500 hover:underline">
            Having problems?
          </a>
          <Link to="/register" className="text-pink-500 font-medium hover:underline">
            Register now
          </Link>
        </div>

        {/* Social section */}
        <p className="text-gray-500 mt-8 text-sm sm:text-base">
          More Login Methods
        </p>

        <div className="flex justify-center gap-6 mt-4 text-2xl text-gray-600">
          <FaGoogle className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
          <FaApple className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
          <FaFacebookF className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
          <FaTwitter className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Login;
