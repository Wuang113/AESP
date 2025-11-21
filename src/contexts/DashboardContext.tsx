import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  Package,
  MessageSquare,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// ==== Types ====
export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
}

export interface Activity {
  title: string;
  timestamp: string;
  type: string;
}

export interface Metric {
  label: string;
  value: string;
  status: "success" | "warning" | "error";
}

interface DashboardContextType {
  stats: Stat[];
  activities: Activity[];
  metrics: Metric[];
  loading: boolean;
  isError: boolean;
}

// ==== Context ====
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};

// goi api lay du lieu admin stats
const fetchAdminStats = async (): Promise<AdminStats> => {
  const response = await apiClient.get("/admin/stats");
  return response.data;
};

// ==== Provider ====
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // lay du lieu admin stats tu api
  const {
    data: adminStats,
    isLoading,
    isError,
  } = useQuery<AdminStats, Error>({
    queryKey: ["adminStats"],
    queryFn: fetchAdminStats,
    refetchInterval: 60000,
  });

  // tinh tinh va map du lieu cho stats
  const stats: Stat[] = [
    {
      title: "Total Users",
      value: String(adminStats?.totalUsers || "0"),
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Mentors",
      value: String(adminStats?.activeMentors || "0"),
      change: "+8.2%",
      trend: "up",
      icon: GraduationCap,
    },
    {
      title: "Total Packages",
      value: String(adminStats?.totalPackages || "0"),
      change: "+15.3%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Total Feedbacks",
      value: String(adminStats?.totalFeedbacks || "0"),
      change: "-3.1%",
      trend: "down",
      icon: MessageSquare,
    },
  ];

  useEffect(() => {}, []);
  return (
    <DashboardContext.Provider
      value={{ stats, activities, metrics, loading: isLoading, isError }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
