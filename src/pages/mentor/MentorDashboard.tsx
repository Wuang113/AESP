import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, BookOpen, MessageSquare } from "lucide-react";

const MentorDashboard: React.FC = () => {
  const stats = [
    { icon: Users, label: "Active Learners", value: "12", color: "bg-blue-100" },
    { icon: Calendar, label: "Sessions This Week", value: "8", color: "bg-purple-100" },
    { icon: BookOpen, label: "Feedback Given", value: "45", color: "bg-green-100" },
    { icon: MessageSquare, label: "Messages", value: "23", color: "bg-pink-100" },
  ];

  const recentLearners = [
    { id: 1, name: "Alice Johnson", level: "Intermediate", lastSession: "2025-11-14" },
    { id: 2, name: "Bob Smith", level: "Beginner", lastSession: "2025-11-13" },
    { id: 3, name: "Carol White", level: "Advanced", lastSession: "2025-11-15" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Mentor! 👋</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your learners today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Learners */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Learners</CardTitle>
          <CardDescription>Your most active learners this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLearners.map((learner) => (
              <div key={learner.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex-1">
                  <h4 className="font-semibold">{learner.name}</h4>
                  <p className="text-sm text-muted-foreground">{learner.level} Level</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last session</p>
                  <p className="text-sm font-medium">{learner.lastSession}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
          <Users className="w-6 h-6 mb-2" />
          <span>My Learners</span>
        </Button>
        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
          <Calendar className="w-6 h-6 mb-2" />
          <span>Schedule</span>
        </Button>
        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
          <MessageSquare className="w-6 h-6 mb-2" />
          <span>Feedback</span>
        </Button>
        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4">
          <BookOpen className="w-6 h-6 mb-2" />
          <span>Resources</span>
        </Button>
      </div>
    </div>
  );
};

export default MentorDashboard;
