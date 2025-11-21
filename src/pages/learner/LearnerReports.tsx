import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LearnerReports: React.FC = () => {
  const data = [
    { week: "Week 1", score: 65, attendance: 80 },
    { week: "Week 2", score: 72, attendance: 85 },
    { week: "Week 3", score: 78, attendance: 90 },
    { week: "Week 4", score: 85, attendance: 95 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Progress Reports</h1>
        <p className="text-muted-foreground mt-2">Track your learning journey and improvements</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-3xl font-bold mt-2 text-blue-600">78%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-3xl font-bold mt-2 text-purple-600">48h</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Attendance</p>
              <p className="text-3xl font-bold mt-2 text-green-600">92%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Score Trend</CardTitle>
          <CardDescription>Your performance over the last 4 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" name="Score %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Badge>🏆 Week 1: 100% Attendance</Badge>
            <Badge>⭐ Week 2: Score Above 70%</Badge>
            <Badge>🔥 Week 3: 5-Day Streak</Badge>
            <Badge>🎯 Week 4: All Sessions Completed</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearnerReports;
