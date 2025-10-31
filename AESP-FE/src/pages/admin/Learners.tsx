import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Edit } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockLearners = [
  { id: 1, name: "Alice Cooper", email: "alice@example.com", aiScore: 87, package: "Premium", progress: 75 },
  { id: 2, name: "Bob Martin", email: "bob@example.com", aiScore: 92, package: "Standard", progress: 60 },
  { id: 3, name: "Carol White", email: "carol@example.com", aiScore: 78, package: "Premium", progress: 45 },
  { id: 4, name: "David Green", email: "david@example.com", aiScore: 85, package: "Basic", progress: 90 },
  { id: 5, name: "Eve Black", email: "eve@example.com", aiScore: 95, package: "Premium", progress: 80 },
];

export default function Learners() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learners</h1>
          <p className="text-muted-foreground">Manage learners and track their progress</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Learner
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search learners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Learner</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>AI Score</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLearners.map((learner) => (
              <TableRow key={learner.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {learner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{learner.name}</span>
                  </div>
                </TableCell>
                <TableCell>{learner.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      learner.aiScore >= 90
                        ? "bg-success text-success-foreground"
                        : learner.aiScore >= 80
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {learner.aiScore}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{learner.package}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={learner.progress} className="w-[100px]" />
                    <span className="text-sm text-muted-foreground">{learner.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
