import type { Task } from './task';
import type { ProjectStatus } from './project';

export interface ProjectDetail {
  id: number;
  name: string;
  description: string | null;
  ownerName: string | null;
  teamName: string | null;

  startDate: string | null;
  dueDate: string | null;

  progress: number | null;
  status: ProjectStatus;

  tags?: string[];

  tasks: Task[];
}
