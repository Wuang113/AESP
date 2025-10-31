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
import { Search, Plus, Edit, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockMentors = [
  { id: 1, name: "Dr. Sarah Johnson", email: "sarah@example.com", rating: 4.8, students: 45, status: "Active" },
  { id: 2, name: "Prof. Michael Chen", email: "michael@example.com", rating: 4.9, students: 62, status: "Active" },
  { id: 3, name: "Dr. Emily Brown", email: "emily@example.com", rating: 4.7, students: 38, status: "Active" },
  { id: 4, name: "Prof. David Lee", email: "david@example.com", rating: 4.6, students: 29, status: "Pending" },
  { id: 5, name: "Dr. Lisa Wilson", email: "lisa@example.com", rating: 4.9, students: 51, status: "Active" },
];

export default function Mentors() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentors</h1>
          <p className="text-muted-foreground">Manage mentor profiles and status</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Mentor
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMentors.map((mentor) => (
              <TableRow key={mentor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{mentor.name}</span>
                  </div>
                </TableCell>
                <TableCell>{mentor.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium">{mentor.rating}</span>
                  </div>
                </TableCell>
                <TableCell>{mentor.students}</TableCell>
                <TableCell>
                  <Badge
                    variant={mentor.status === "Active" ? "default" : "secondary"}
                    className={
                      mentor.status === "Active"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {mentor.status}
                  </Badge>
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
