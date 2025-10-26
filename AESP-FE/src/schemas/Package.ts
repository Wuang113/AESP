export interface Package {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration_days: number;
  has_mentor: boolean;
  status?: "active" | "inactive";
  created_at?: string;
}
