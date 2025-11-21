// src/pages/learner/Practice.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Practice: React.FC = () => {
  const navigate = useNavigate();

  // lay thong tin profile learner
  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => (await apiClient.get("/learners/profile/me")).data,
  });

  // api goi de tao session moi
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      if (!profile?.id) throw new Error("Profile not found");

      const newSession = {
        learnerId: profile.id,
        topic: "Daily Conversation",
        scenario: "Ordering Coffee",
        durationMinutes: 15,
        aiVersion: "v1.0",
      };

      return await apiClient.post("/practice-sessions", newSession);
    },
    onSuccess: () => {
      toast.success("Session started! (AI connection simulated)");
      // co the chuyen huong den trang session neu can
      // navigate("/learner/session/123");
    },
    onError: () => {
      toast.error("Failed to start session. Please try again.");
    },
  });

  const handleStartPractice = () => {
    if (!profile) {
      toast.error("Loading profile... please wait.");
      return;
    }
    startSessionMutation.mutate();
  };

  return (
    <div className="min-h-screen p-5 sm:p-10 bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins] flex flex-col">
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Speaking Practice
        </h1>
        <Link
          to="/learner"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 px-4 transition-colors duration-200 shadow-md"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

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
            onClick={handleStartPractice}
            disabled={startSessionMutation.isPending}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-3 px-8 text-lg transition shadow-md flex items-center justify-center gap-2 w-full"
          >
            {startSessionMutation.isPending && (
              <Loader2 className="animate-spin" />
            )}
            {startSessionMutation.isPending
              ? "Starting..."
              : "Start Practice Session"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
