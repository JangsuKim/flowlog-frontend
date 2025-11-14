export type TaskStatus =
  | 'BACKLOG'
  | 'IN_PROGRESS'
  | 'BEFORE_REVIEW'
  | 'IN_REVIEW'
  | 'PENDING'
  | 'PRE_RELEASE'
  | 'DONE';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeName?: string;
  dueDate?: string; // optional
  tags?: string[];
}
