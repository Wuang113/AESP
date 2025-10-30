import React from "react";
import { Link } from "react-router-dom";
// import { FaCheckCircle, FaLock, FaPlayCircle } from "react-icons/fa";

// Khuôn cho từng bài học trong lộ trình
interface LessonItemProps {
  title: string;
  duration: string;
  status: "completed" | "current" | "locked";
}

const LessonItem: React.FC<LessonItemProps> = ({ title, duration, status }) => {
  const getIcon = () => {
    if (status === "completed") {
      // return <FaCheckCircle className="text-green-500" />;
      return <span className="text-green-500">✔</span>;
    }
    if (status === "current") {
      // return <FaPlayCircle className="text-pink-500" />;
      return <span className="text-pink-500">▶</span>;
    }
    // return <FaLock className="text-gray-400" />;
    return <span className="text-gray-400">🔒</span>;
  };

  const itemClasses =
    status === "locked"
      ? "bg-gray-100 opacity-60"
      : "bg-white hover:bg-pink-50";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow ${itemClasses} transition-all mb-3`}
    >
      <div className="flex items-center gap-4">
        <div className="text-xl">{getIcon()}</div>
        <div>
          <h4
            className={`font-semibold ${
              status === "locked" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {title}
          </h4>
          <p className="text-sm text-gray-500">{duration}</p>
        </div>
      </div>
      {status === "current" && (
        <button className="bg-pink-400 text-white text-sm font-semibold py-1 px-3 rounded-full hover:bg-pink-500">
          Start
        </button>
      )}
    </div>
  );
};

// Component trang chính
const LearningPathPage: React.FC = () => {
  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins]">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Your Learning Path
        </h1>
        <Link
          to="/learner/dashboard"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/*  bai hoc */}
      <div className="max-w-3xl mx-auto">
        {/* Module 1: Beginner */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Module 1: Beginner Conversations
          </h2>
          <LessonItem
            title="Lesson 1: Greetings & Introductions"
            duration="10 mins"
            status="completed"
          />
          <LessonItem
            title="Lesson 2: Talking About Your Job"
            duration="15 mins"
            status="completed"
          />
          <LessonItem
            title="Lesson 3: Ordering Food"
            duration="15 mins"
            status="current"
          />
        </div>

        {/* Module 2: Intermediate */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Module 2: Intermediate Topics
          </h2>
          <LessonItem
            title="Lesson 4: Talking About Hobbies"
            duration="20 mins"
            status="locked"
          />
          <LessonItem
            title="Lesson 5: Making Plans"
            duration="15 mins"
            status="locked"
          />
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage;
