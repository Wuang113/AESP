import React from "react";
import { Link } from "react-router-dom";
import ActionCard from "../../components/Action";

const LearnerDashboard: React.FC = () => {
  const openCard = (cardName: string) => {
    alert(`Opening ${cardName}!`);
  };

  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins]">
      {/* Header */}
      <header className="flex justify-between items-center mb-5 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Welcome back 👋
        </h1>
        <Link
          className="bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md"
          to="/learner/practice"
        >
          Start Practice
        </Link>
      </header>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-5 sm:mb-8">
        {/* Card 1: Current Streak */}
        <div className="bg-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-pink-100 text-pink-500 text-2xl">
            🔥
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Streak</p>
            <p className="text-2xl font-bold text-gray-800">7 days</p>
          </div>
        </div>

        {/* Card 2: Overall Progress */}
        <div className="bg-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-pink-100 text-pink-500 text-2xl">
            ▶️
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Overall Progress</p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden my-1">
              <div
                className="h-full bg-pink-400"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">65% complete</p>
          </div>
        </div>

        {/* Card 3: Achievements */}
        <div className="bg-white p-5 rounded-2xl shadow-lg flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-pink-100 text-pink-500 text-2xl">
            🏆
          </div>
          <div>
            <p className="text-sm text-gray-500">Achievements</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <ActionCard
          icon="📖"
          title="Learning Path"
          description="Continue adaptive English lessons"
          to="/learner/learning-path"
        />
        <ActionCard
          icon="🎤"
          title="Speaking Practice"
          description="Practice with AI anytime"
          to="/learner/practice"
        />
        <ActionCard
          icon="🎯"
          title="Set New Goals"
          description="Update your learning goals"
          to="/learner/profile"
        />
        <ActionCard
          icon="📊"
          title="View Reports"
          description="Check performance analytics"
          to="/learner/reports"
        />
      </section>
    </div>
  );
};

export default LearnerDashboard;
