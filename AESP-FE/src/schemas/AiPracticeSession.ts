export interface AiPracticeSession {
  id: number;
  learner_id: number;
  topic: string;
  scenario: string;
  duration_minutes: number;
  pronunciation_score?: number;
  grammar_score?: number;
  vocabulary_score?: number;
  ai_feedback?: string;
  audio_url?: string;
  ai_version?: string;
  created_at?: string;
}
