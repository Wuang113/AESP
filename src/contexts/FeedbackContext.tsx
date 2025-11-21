import React, { useState } from "react";
import {
  FeedbackContext,
  Feedback,
  FeedbackContextType,
} from "./FeedbackContextType";

const initialFeedbacks: Feedback[] = [
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
];

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);

  const approveFeedback = (id: number) =>
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "Approved" } : f))
    );

  const rejectFeedback = (id: number) =>
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "Rejected" } : f))
    );

  return (
    <FeedbackContext.Provider
      value={{ feedbacks, approveFeedback, rejectFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
