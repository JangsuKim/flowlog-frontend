import { api } from './axiosConfig';
import type { Project, ProjectStatus } from '../types/project';
import type { ProjectDetail } from '../types/projectDetail';

/** 목록 조회 파라미터 (필요 시 확장) */
export interface ProjectListParams {
  teamId?: number;
  status?: ProjectStatus; // 'IN_PROGRESS' | 'COMPLETED'
}

/** 생성 입력 */
export interface ProjectCreateInput {
  name: string;
  description?: string;
  dueDate?: string; // 'YYYY-MM-DD'
  teamId: number; // 생성은 팀 필수로 가정 (필요 시 ?: 로 변경)
  status?: ProjectStatus; // 기본 IN_PROGRESS (백엔드 기본값 있으면 생략 가능)
}

/** 수정 입력 (Flowboard에서 허용: 타이틀/마감일/팀) */
export type ProjectUpdateInput = Partial<
  Pick<Project, 'name' | 'dueDate' | 'teamId'>
>;

/** ------------------------------------------------------------------ */
/** 프로젝트 생성 */
export async function createProject(input: ProjectCreateInput) {
  const { data } = await api.post<Project>('/projects', input);
  return data;
}

/** 프로젝트 목록 조회 */
export async function getProjects(params?: ProjectListParams) {
  const { data } = await api.get<Project[]>('/projects', { params });
  return data;
}

/** 팀별 프로젝트 조회 (syntactic sugar) */
export async function getProjectsByTeam(teamId: number) {
  return getProjects({ teamId });
}

/** 프로젝트 상세 조회 */
export async function getProjectById(id: number) {
  const { data } = await api.get<ProjectDetail>(`/projects/${id}`);
  return data;
}

/** 프로젝트 수정 (Flowboard용) */
export async function updateProject(id: number, payload: ProjectUpdateInput) {
  const { data } = await api.put<Project>(`/projects/${id}`, payload);
  return data;
}

/** 프로젝트 삭제 (현재는 미사용/클로즈 운영 권장) */
export async function deleteProject(id: number) {
  await api.delete(`/projects/${id}`);
}
