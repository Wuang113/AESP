export interface ProgressReport {
  id: number;
  learner_id: number;
  week_start: string;
  week_end: string;
  total_sessions: number;
  avg_pronunciation: number;
  avg_grammar: number;
  avg_vocabulary: number;
  generated_at: string;
  improvement_notes?: string;
}
