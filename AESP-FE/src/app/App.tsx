import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LearnerDashboard from "../pages/learner/LearnerDashboard";
import LearningPath from "../pages/learner/LearningPath";
import Profile from "../pages/learner/Profile";
import Practice from "../pages/learner/Practice";
import Reports from "../pages/learner/Reports";
import MentorDashboard from "../pages/mentor/MentorDashboard";
import Learners from "../pages/mentor/Learners";
import Schedule from "../pages/mentor/Schedule";
import Resources from "../pages/mentor/Resources";
import MentorProfilePage from "../pages/mentor/MentorProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learner/dashboard" element={<LearnerDashboard />} />
        <Route path="/learner/learning-path" element={<LearningPath />} />
        <Route path="/learner/profile" element={<Profile />} />
        <Route path="/learner/practice" element={<Practice />} />
        <Route path="/learner/reports" element={<Reports />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/mentor/learners" element={<Learners />} />
        <Route path="/mentor/schedule" element={<Schedule />} />
        <Route path="/mentor/resources" element={<Resources />} />
        <Route path="/mentor/profile" element={<MentorProfilePage />} />
      </Routes>
    </BrowserRouter>
import { Toaster } from "../components/ui/toaster";
import { Toaster as Sonner } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Index from "../pages/Index";

// ✅ Admin pages
import { AdminLayout } from "../components/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Mentors from "../pages/admin/Mentors";
import Learners from "../pages/admin/Learners";
import Packages from "../pages/admin/Packages";
import Reports from "../pages/admin/Reports";
import Policies from "../pages/admin/Policies";
import Feedbacks from "../pages/admin/Feedbacks";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public page */}
            <Route path="/index" element={<Index />} />

            {/* Admin section */}
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

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
