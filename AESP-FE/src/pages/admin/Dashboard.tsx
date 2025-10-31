import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, Package, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,345",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Mentors",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: GraduationCap,
  },
  {
    title: "Active Learners",
    value: "2,189",
    change: "+15.3%",
    trend: "up",
    icon: BookOpen,
  },
  {
    title: "Package Sales",
    value: "892",
    change: "-3.1%",
    trend: "down",
    icon: Package,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">System overview and key metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendIcon
                    className={`h-3 w-3 ${
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    }`}
                  />
                  <span
                    className={stat.trend === "up" ? "text-success" : "text-destructive"}
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New user registered", time: "2 minutes ago", type: "user" },
                { action: "Package purchased", time: "15 minutes ago", type: "package" },
                { action: "Mentor approved", time: "1 hour ago", type: "mentor" },
                { action: "Feedback submitted", time: "2 hours ago", type: "feedback" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "API Response Time", value: "145ms", status: "success" },
                { label: "Database Load", value: "42%", status: "success" },
                { label: "Active Sessions", value: "1,234", status: "success" },
                { label: "Error Rate", value: "0.02%", status: "success" },
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="text-sm text-success">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}