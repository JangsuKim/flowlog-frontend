export type ProjectStatus = 'IN_PROGRESS' | 'COMPLETED';

/** 화면(Dashboard)에서 사용하는 표준 Project 타입 */
export interface Project {
  id: number;
  name: string;
  ownerName: string | null;
  startDate: string | null; // "YYYY-MM-DD"
  dueDate: string | null; // "YYYY-MM-DD"
  teamId: number | null;
  teamName: string | null;
  status: ProjectStatus;
  progress?: number | null;
  description?: string | null;
  tags?: string[];
}

/** 백엔드 응답 DTO (필요하면 조정) */
export interface ProjectApiResponse {
  id: number;
  name: string;
  ownerName?: string | null;
  dueDate: string;
  teamId?: number | null;
  teamName?: string | null;
  status: ProjectStatus;
  progress?: number | null;
  description?: string | null;
}
