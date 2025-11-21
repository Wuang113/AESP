import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MentorReports: React.FC = () => {
  const data = [
    { week: "Week 1", feedback: 8, sessions: 12 },
    { week: "Week 2", feedback: 12, sessions: 14 },
    { week: "Week 3", feedback: 15, sessions: 16 },
    { week: "Week 4", feedback: 18, sessions: 18 },
  ];

  const reportsData = [
    { id: 1, learnerName: "Alice Johnson", progress: 75, engagement: "High", lastReportDate: "2025-11-14" },
    { id: 2, learnerName: "Bob Smith", progress: 45, engagement: "Medium", lastReportDate: "2025-11-13" },
    { id: 3, learnerName: "Carol White", progress: 88, engagement: "Very High", lastReportDate: "2025-11-15" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Reports</h1>
        <p className="text-muted-foreground mt-2">Monitor learner progress and engagement</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Learners</p>
              <p className="text-3xl font-bold mt-2 text-blue-600">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Feedback Sent</p>
              <p className="text-3xl font-bold mt-2 text-purple-600">45</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg. Progress</p>
              <p className="text-3xl font-bold mt-2 text-green-600">69%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Trend</CardTitle>
          <CardDescription>Feedback and session trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="feedback" stroke="#8b5cf6" name="Feedback Given" />
              <Line type="monotone" dataKey="sessions" stroke="#3b82f6" name="Sessions" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learner Status</CardTitle>
          <CardDescription>Current progress and engagement levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportsData.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{report.learnerName}</h4>
                  <p className="text-sm text-muted-foreground">Last report: {report.lastReportDate}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{report.progress}% progress</Badge>
                  <Badge>{report.engagement}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// export default MentorReports;
//         export default MentorReports;
//       </div>
//     </div>
//   );
// };

export default MentorReports;
