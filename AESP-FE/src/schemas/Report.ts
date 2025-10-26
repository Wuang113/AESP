export interface Report {
  id: number;
  admin_id: number;
  file_url: string;
  report_type: string;
  generated_at: string;
  data_summary?: string;
}
