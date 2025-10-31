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
  );
}

export default App;
