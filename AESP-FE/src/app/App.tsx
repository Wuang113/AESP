import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LearnerDashboard from "../pages/learner/LearnerDashboard";
import LearningPathPage from "../pages/learner/LearningPath";
import ProfilePage from "../pages/learner/Profile";
import PracticePage from "../pages/learner/Practice";
import ReportsPage from "../pages/learner/Reports";
import MentorDashboard from "../pages/mentor/MentorDashboard";
import LearnersPage from "../pages/mentor/Learners";
import SchedulePage from "../pages/mentor/Schedule";
import ResourcesPage from "../pages/mentor/Resources";
import MentorProfilePage from "../pages/mentor/MentorProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learner/dashboard" element={<LearnerDashboard />} />
        <Route path="/learner/learning-path" element={<LearningPathPage />} />
        <Route path="/learner/profile" element={<ProfilePage />} />
        <Route path="/learner/practice" element={<PracticePage />} />
        <Route path="/learner/reports" element={<ReportsPage />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/mentor/learners" element={<LearnersPage />} />
        <Route path="/mentor/schedule" element={<SchedulePage />} />
        <Route path="/mentor/resources" element={<ResourcesPage />} />
        <Route path="/mentor/profile" element={<MentorProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
