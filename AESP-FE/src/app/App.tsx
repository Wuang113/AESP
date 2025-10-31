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
