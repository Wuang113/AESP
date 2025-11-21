import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Play } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  status: "in-progress" | "locked" | "completed";
  level: "Beginner" | "Intermediate" | "Advanced";
}

const LearningPath: React.FC = () => {
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: "English Basics",
      description: "Start your journey with fundamental English skills",
      progress: 100,
      lessons: 10,
      completedLessons: 10,
      status: "completed",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Intermediate Conversations",
      description: "Build confidence in everyday conversations",
      progress: 65,
      lessons: 15,
      completedLessons: 10,
      status: "in-progress",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Advanced Business English",
      description: "Master professional communication skills",
      progress: 0,
      lessons: 20,
      completedLessons: 0,
      status: "locked",
      level: "Advanced",
    },
    {
      id: 4,
      title: "IELTS Preparation",
      description: "Prepare for IELTS examination",
      progress: 0,
      lessons: 25,
      completedLessons: 0,
      status: "locked",
      level: "Advanced",
    },
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Play className="w-5 h-5 text-blue-600" />;
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Learning Path</h1>
        <p className="text-muted-foreground mt-2">
          Track your progress through structured learning modules
        </p>
      </div>

      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 flex items-start gap-3">
                  <div className="mt-1">{getStatusIcon(course.status)}</div>
                  <div className="flex-1">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="mt-1">{course.description}</CardDescription>
                  </div>
                </div>
                <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span className="text-muted-foreground">
                    {course.completedLessons} / {course.lessons} lessons
                  </span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              {course.status === "locked" && (
                <p className="text-sm text-amber-600">
                  Complete previous courses to unlock this module
                </p>
              )}
              
              {course.status !== "locked" && (
                <Button className="w-full" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  {course.status === "completed" ? "Review" : "Continue"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
