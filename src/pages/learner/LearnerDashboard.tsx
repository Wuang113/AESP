// src/pages/learner/LearnerDashboard.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  TrendingUp,
  Award,
  Play,
  BookOpen,
  BarChart3,
  Target,
  Mic, // Icon mới cho điểm phát âm
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// Lưu ý: Đảm bảo file schemas/LearnerProfile đã định nghĩa đúng kiểu dữ liệu
import { LearnerProfile } from "@/schemas/LearnerProfile";

// API call lấy profile của user đang đăng nhập
const fetchMyProfile = async (): Promise<LearnerProfile> => {
  const response = await apiClient.get("/learners/profile/me");
  return response.data;
};

const LearnerDashboard: React.FC = () => {
  const { user } = useAuth();

  // Lấy dữ liệu profile từ API
  const { data: profile, isLoading } = useQuery<LearnerProfile>({
    queryKey: ["my-profile"],
    queryFn: fetchMyProfile,
  });

  const stats = [
    {
      icon: TrendingUp,
      label: "AI Score",
      // Sửa: dùng aiScore thay vì ai_score
      value: profile?.aiScore ? profile.aiScore.toFixed(1) : "0.0",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      icon: Mic, // Thay Flame (Streak) bằng Mic (Phát âm) vì backend chưa có streak
      label: "Pronunciation",
      // Dữ liệu thật: Điểm phát âm
      value: profile?.pronunciationScore
        ? profile.pronunciationScore.toFixed(1)
        : "0.0",
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      icon: Award,
      label: "Practice Time",
      // Sửa: dùng totalPracticeMinutes thay vì total_practice_minutes
      value: profile?.totalPracticeMinutes
        ? `${profile.totalPracticeMinutes}m`
        : "0m",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      icon: Play,
      title: "Speaking Practice",
      description: "Practice with AI anytime",
      url: "/learner/practice",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: BookOpen,
      title: "Learning Packages",
      description: "Upgrade your learning plan",
      url: "/learner/packages", // Link đến trang mua gói
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: BarChart3,
      title: "Progress Reports",
      description: "Check performance analytics",
      url: "/learner/reports",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Target,
      title: "My Profile",
      description: "Update goals & settings",
      url: "/learner/profile",
      color: "from-purple-400 to-purple-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {profile?.name || user?.name} 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Keep up the great work! Your progress is on track.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className="hover:shadow-lg transition-shadow border-none shadow-sm"
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Action Cards */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <a
                key={idx}
                href={action.url}
                className="group cursor-pointer block h-full"
              >
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 hover:-translate-y-1 border-muted/40">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
