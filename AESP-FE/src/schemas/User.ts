export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  role: "admin" | "mentor" | "learner";
  avatar_url?: string;
  status?: "active" | "disabled";
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
