export interface LearnerPackage {
  id: number;
  learner_id: number;
  package_id: number;
  transaction_id?: number;
  purchase_date?: string;
  price_at_purchase?: number;
  expire_date?: string;
  payment_status?: "pending" | "completed" | "failed";
}
