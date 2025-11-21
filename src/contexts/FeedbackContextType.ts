import { createContext } from "react";

export type Feedback = {
  id: number;
  user: string;
  mentor: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
};

export type FeedbackContextType = {
  feedbacks: Feedback[];
  approveFeedback: (id: number) => void;
  rejectFeedback: (id: number) => void;
};

export const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);
