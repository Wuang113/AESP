import { UserRole } from "@/schemas/User";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Package,
  FileText,
  Shield,
  MessageSquare,
  Calendar,
  Zap,
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

// Admin menu items - full access to all features
export const adminMenuItems: MenuItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Mentors", url: "/admin/mentors", icon: GraduationCap },
  { title: "Learners", url: "/admin/learners", icon: BookOpen },
  { title: "Packages", url: "/admin/packages", icon: Package },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "System Policies", url: "/admin/policies", icon: Shield },
  { title: "Feedbacks", url: "/admin/feedbacks", icon: MessageSquare },
];

// Learner menu items - access to personal resources
export const learnerMenuItems: MenuItem[] = [
  { title: "Dashboard", url: "/learner", icon: LayoutDashboard },
  { title: "Practice Sessions", url: "/learner/practice", icon: Zap },
  { title: "Learning Path", url: "/learner/learning-path", icon: BookOpen },
  { title: "My Packages", url: "/learner/packages", icon: Package },
  { title: "Progress Reports", url: "/learner/reports", icon: FileText },
  { title: "My Profile", url: "/learner/profile", icon: Users },
];

// Mentor menu items - access to teaching resources
export const mentorMenuItems: MenuItem[] = [
  { title: "Dashboard", url: "/mentor", icon: LayoutDashboard },
  { title: "My Learners", url: "/mentor/learners", icon: BookOpen },
  { title: "My Profile", url: "/mentor/profile", icon: Users },
  { title: "Feedback", url: "/mentor/feedback", icon: MessageSquare },
  { title: "Resources", url: "/mentor/resources", icon: Package },
  { title: "Reports", url: "/mentor/reports", icon: FileText },
];

// Get menu items based on role
export function getMenuItemsByRole(role: UserRole): MenuItem[] {
  switch (role) {
    case UserRole.ADMIN:
      return adminMenuItems;
    case UserRole.LEARNER:
      return learnerMenuItems;
    case UserRole.MENTOR:
      return mentorMenuItems;
    default:
      return [];
  }
}
