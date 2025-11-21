import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/AdminLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Mentors from "./pages/admin/Mentors";
import Learners from "./pages/admin/Learners";
import Packages from "./pages/admin/Packages";
import Reports from "./pages/admin/Reports";
import Policies from "./pages/admin/Policies";
import Feedbacks from "./pages/admin/Feedbacks";

// Learner Pages
import LearnerDashboard from "./pages/learner/LearnerDashboard";
import LearningPath from "./pages/learner/LearningPath";
import LearnerProfile from "./pages/learner/LearnerProfile";
import Practice from "./pages/learner/Practice";
import LearnerReports from "./pages/learner/LearnerReports";
import LearnerPackages from "./pages/learner/LearnerPackages";

// Mentor Pages
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MentorLearners from "./pages/mentor/MentorLearners";
import MentorProfile from "./pages/mentor/MentorProfile";
import MentorResources from "./pages/mentor/MentorResources";
import MentorFeedback from "./pages/mentor/MentorFeedback";
import MentorReports from "./pages/mentor/MentorReports";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";

import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <DashboardProvider>
            <FeedbackProvider>
              <Toaster />
              <Sonner />

              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/index" element={<Index />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="mentors" element={<Mentors />} />
                    <Route path="learners" element={<Learners />} />
                    <Route path="packages" element={<Packages />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="policies" element={<Policies />} />
                    <Route path="feedbacks" element={<Feedbacks />} />
                  </Route>

                  {/* Learner Routes */}
                  <Route path="/learner" element={<AdminLayout />}>
                    <Route index element={<LearnerDashboard />} />
                    <Route path="learning-path" element={<LearningPath />} />
                    <Route path="profile" element={<LearnerProfile />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="reports" element={<LearnerReports />} />
                    <Route path="packages" element={<LearnerPackages />} />
                  </Route>

                  {/* Mentor Routes */}
                  <Route path="/mentor" element={<AdminLayout />}>
                    <Route index element={<MentorDashboard />} />
                    <Route path="learners" element={<MentorLearners />} />
                    <Route path="profile" element={<MentorProfile />} />
                    {/* Schedule removed per product decision */}
                    <Route path="feedback" element={<MentorFeedback />} />
                    <Route path="resources" element={<MentorResources />} />
                    <Route path="reports" element={<MentorReports />} />
                  </Route>

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </FeedbackProvider>
          </DashboardProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
