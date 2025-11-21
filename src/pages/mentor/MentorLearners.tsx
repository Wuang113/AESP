import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, Calendar } from "lucide-react";

interface Learner {
  id: number;
  name: string;
  email: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  joinDate: string;
  lastSession: string;
  progress: number;
  sessionsCompleted: number;
}

const MentorLearners: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const learners: Learner[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      level: "Intermediate",
      joinDate: "2025-09-01",
      lastSession: "2025-11-15",
      progress: 75,
      sessionsCompleted: 24,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      level: "Beginner",
      joinDate: "2025-10-15",
      lastSession: "2025-11-14",
      progress: 45,
      sessionsCompleted: 12,
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      level: "Advanced",
      joinDate: "2025-08-20",
      lastSession: "2025-11-15",
      progress: 88,
      sessionsCompleted: 36,
    },
    {
      id: 4,
      name: "Diana Brown",
      email: "diana@example.com",
      level: "Intermediate",
      joinDate: "2025-09-10",
      lastSession: "2025-11-13",
      progress: 62,
      sessionsCompleted: 18,
    },
  ];

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

  const filteredLearners = learners.filter(
    (learner) =>
      learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      learner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Learners</h1>
        <p className="text-muted-foreground mt-2">Manage and monitor your assigned learners</p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Learners Table */}
      <div className="space-y-4">
        {filteredLearners.map((learner) => (
          <Card key={learner.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {learner.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold">{learner.name}</h3>
                      <p className="text-sm text-muted-foreground">{learner.email}</p>
                    </div>
                  </div>
                </div>
                <Badge className={getLevelColor(learner.level)}>{learner.level}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Join Date</p>
                  <p className="font-medium text-sm">{learner.joinDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Session</p>
                  <p className="font-medium text-sm">{learner.lastSession}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Progress</p>
                  <p className="font-medium text-sm">{learner.progress}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sessions</p>
                  <p className="font-medium text-sm">{learner.sessionsCompleted}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Feedback
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{learner.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${learner.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLearners.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No learners found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MentorLearners;
