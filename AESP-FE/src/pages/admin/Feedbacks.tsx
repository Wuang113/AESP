import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, X, Star } from "lucide-react";

const mockFeedbacks = [
  {
    id: 1,
    user: "John Doe",
    mentor: "Dr. Sarah Johnson",
    rating: 5,
    comment: "Excellent mentor! Very patient and knowledgeable.",
    status: "Pending",
    date: "2024-01-20",
  },
  {
    id: 2,
    user: "Jane Smith",
    mentor: "Prof. Michael Chen",
    rating: 4,
    comment: "Great sessions, learned a lot. Would recommend!",
    status: "Approved",
    date: "2024-01-19",
  },
  {
    id: 3,
    user: "Bob Johnson",
    mentor: "Dr. Emily Brown",
    rating: 5,
    comment: "Outstanding teaching style and very helpful resources.",
    status: "Pending",
    date: "2024-01-18",
  },
  {
    id: 4,
    user: "Alice Williams",
    mentor: "Prof. David Lee",
    rating: 3,
    comment: "Good mentor but sessions could be more structured.",
    status: "Approved",
    date: "2024-01-17",
  },
];

export default function Feedbacks() {
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feedbacks</h1>
          <p className="text-muted-foreground">Review and moderate user feedback</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {mockFeedbacks.map((feedback) => (
          <Card key={feedback.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {feedback.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{feedback.user}</CardTitle>
                    <CardDescription>for {feedback.mentor}</CardDescription>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating
                              ? "fill-warning text-warning"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={feedback.status === "Approved" ? "default" : "secondary"}
                  className={
                    feedback.status === "Approved"
                      ? "bg-success text-success-foreground"
                      : ""
                  }
                >
                  {feedback.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{feedback.comment}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(feedback.date).toLocaleDateString()}
                </span>
                {feedback.status === "Pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-success text-success-foreground">
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
