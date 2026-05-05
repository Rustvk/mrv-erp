export interface ExpensePlan {
  id: string;
  departmentId: string;
  totalAmount: number;
  period: string; // например, '2024-Q3'
  status: 'DRAFT' | 'APPROVED' | 'REJECTED';
}
