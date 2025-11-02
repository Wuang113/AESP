import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Calendar } from "lucide-react";

const reportTypes = [
  {
    title: "User Activity Report",
    description: "Detailed user engagement and activity metrics",
    icon: FileText,
    lastGenerated: "2 hours ago",
  },
  {
    title: "Financial Report",
    description: "Revenue, expenses, and financial overview",
    icon: FileText,
    lastGenerated: "1 day ago",
  },
  {
    title: "Mentor Performance",
    description: "Mentor ratings, sessions, and feedback",
    icon: FileText,
    lastGenerated: "3 days ago",
  },
  {
    title: "Learner Progress",
    description: "Learning outcomes and progress tracking",
    icon: FileText,
    lastGenerated: "1 day ago",
  },
  {
    title: "System Analytics",
    description: "Technical metrics and system health",
    icon: FileText,
    lastGenerated: "5 hours ago",
  },
  {
    title: "Monthly Summary",
    description: "Comprehensive monthly performance report",
    icon: FileText,
    lastGenerated: "7 days ago",
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate and download system reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report, i) => {
          const Icon = report.icon;
          return (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Last generated: {report.lastGenerated}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Report</CardTitle>
          <CardDescription>Generate a custom report with specific parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Generate Custom Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}
