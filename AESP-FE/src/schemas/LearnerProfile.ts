export interface LearnerProfile {
  id: number;
  user_id: number;
  english_level?: "beginner" | "intermediate" | "advanced";
  goals?: string;
  preferences?: string;
  ai_score?: number;
  pronunciation_score?: number;
  total_practice_minutes?: number;
}
