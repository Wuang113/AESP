export interface Mentor {
  id: number;
  user_id: number;
  bio?: string;
  skills?: string;
  rating?: number;
  experience_years?: number;
  total_students?: number;
  availability_status?: "available" | "busy" | "inactive";
}
