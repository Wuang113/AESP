export interface MentorFeedback {
  id: number;
  mentor_id: number;
  learner_id: number;
  session_id: number;
  pronunciation_comment?: string;
  grammar_comment?: string;
  rating?: number;
  improvement_suggestion?: string;
  created_at?: string;
}
