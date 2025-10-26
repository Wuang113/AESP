export interface FeedbackComment {
  id: number;
  user_id: number;
  content: string;
  target_type: "app" | "mentor" | "package" | "session";
  target_id: number;
  rating: number;
  created_at: string;
}
