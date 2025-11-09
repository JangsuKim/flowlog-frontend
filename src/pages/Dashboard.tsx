import { useState } from 'react';
import AppLayout from '../layout/AppLayout';

// ✅ 사용자 역할 (임시 하드코딩)
const userRole = 'LEADER';
const userTeam = 'Frontend';

// ✅ 프로젝트 타입
interface Project {
  id: number;
  name: string;
  owner: string;
  progress: number;
  dueDate: string;
  teamName: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
}

// ✅ 더미 데이터
const dummyProjects: Project[] = [
  {
    id: 1,
    name: 'FlowLog Core System',
    owner: 'Jangsoo',
    progress: 85,
    dueDate: '2025-12-10',
    teamName: 'Backend',
    status: 'IN_PROGRESS',
  },
  {
    id: 2,
    name: 'Frontend Integration',
    owner: 'Jangsoo',
    progress: 100,
    dueDate: '2025-11-30',
    teamName: 'Frontend',
    status: 'COMPLETED',
  },
  {
    id: 3,
    name: 'Kanban Module',
    owner: 'Jangsoo',
    progress: 25,
    dueDate: '2025-12-05',
    teamName: 'Frontend',
    status: 'IN_PROGRESS',
  },
  {
    id: 4,
    name: 'Database Refactor',
    owner: 'Jangsoo',
    progress: 100,
    dueDate: '2025-12-15',
    teamName: 'Backend',
    status: 'COMPLETED',
  },
];

// ✅ 팀별 그룹화 함수
function groupByTeam(projects: Project[]) {
  return projects.reduce((acc, project) => {
    (acc[project.teamName] = acc[project.teamName] || []).push(project);
    return acc;
  }, {} as Record<string, Project[]>);
}

export default function Dashboard() {
  const [cardSize, setCardSize] = useState<'L' | 'M' | 'S'>('L');
  const [statusFilter, setStatusFilter] = useState<'IN_PROGRESS' | 'COMPLETED'>(
    'IN_PROGRESS'
  );
  const groupedProjects = groupByTeam(dummyProjects);

  return (
    <AppLayout>
      {/* 헤더 영역 */}
      <div className='flex items-start justify-between mb-8'>
        {/* 왼쪽: 제목 */}
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Flow Board</h1>

        {/* 오른쪽: 드롭다운 그룹 */}
        <div className='flex items-center gap-4'>
          {/* ステータス */}
          <div className='flex items-center gap-2'>
            <label htmlFor='status' className='text-gray-500 text-sm'>
              ステータス
            </label>
            <select
              id='status'
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'IN_PROGRESS' | 'COMPLETED')
              }
              className='border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 bg-white focus:ring-1 focus:ring-blue-300 focus:outline-none'
            >
              <option value='IN_PROGRESS'>進行中</option>
              <option value='COMPLETED'>完了</option>
            </select>
          </div>

          {/* サイズ */}
          <div className='flex items-center gap-2'>
            <label htmlFor='cardSize' className='text-gray-500 text-sm'>
              サイズ
            </label>
            <select
              id='cardSize'
              value={cardSize}
              onChange={(e) => setCardSize(e.target.value as 'L' | 'M' | 'S')}
              className='border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 bg-white focus:ring-1 focus:ring-blue-300 focus:outline-none'
            >
              <option value='L'>L</option>
              <option value='M'>M</option>
              <option value='S'>S</option>
            </select>
          </div>
        </div>
      </div>

      {/* 팀별 섹션 */}
      {userRole === 'LEADER' ? (
        Object.entries(groupedProjects).map(([team, projects]) => (
          <section key={team} className='mb-10'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
              {team} Team
            </h2>
            <div className='flex flex-wrap gap-6'>
              {projects
                .filter((p) => p.status === statusFilter)
                .map((p) => (
                  <ProjectCard key={p.id} project={p} size={cardSize} />
                ))}
              {projects.filter((p) => p.status === statusFilter).length ===
                0 && (
                <p className='text-gray-400 text-sm ml-2'>
                  該当するプロジェクトがありません。
                </p>
              )}
            </div>
          </section>
        ))
      ) : (
        <section>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
            {userTeam} チーム
          </h2>
          <div className='flex flex-wrap gap-6'>
            {dummyProjects
              .filter(
                (p) => p.teamName === userTeam && p.status === statusFilter
              )
              .map((p) => (
                <ProjectCard key={p.id} project={p} size={cardSize} />
              ))}
            {dummyProjects.filter(
              (p) => p.teamName === userTeam && p.status === statusFilter
            ).length === 0 && (
              <p className='text-gray-400 text-sm ml-2'>
                該当するプロジェクトがありません。
              </p>
            )}
          </div>
        </section>
      )}
    </AppLayout>
  );
}

/* ✅ 프로젝트 카드 */
function ProjectCard({
  project,
  size,
}: {
  project: Project;
  size: 'L' | 'M' | 'S';
}) {
  const sizeStyles = {
    L: 'w-[260px] h-[180px] p-6 text-base',
    M: 'w-[260px] h-[100px] p-4 text-sm',
    S: 'w-[120px] h-[80px] p-3 text-xs relative', // 👈 relative 추가 (진행률 위치 조정용)
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100 ${sizeStyles[size]}`}
    >
      {/* 타이틀 */}
      <h3
        className={`${
          size === 'S' ? 'text-sm' : size === 'M' ? 'text-lg' : 'text-xl'
        } font-semibold text-gray-700 mb-2`}
      >
        {project.name}
      </h3>

      {/* L 사이즈: 전체 정보 표시 */}
      {size === 'L' && (
        <>
          <p className='text-gray-500 mb-1'>担当者: {project.owner}</p>
          <p className='text-gray-500 mb-3'>期限: {project.dueDate}</p>

          <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                project.status === 'COMPLETED' ? 'bg-green-400' : 'bg-blue-400'
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <p className='text-right text-gray-500 text-xs'>
            {project.progress}% 完了
          </p>
        </>
      )}

      {/* M 사이즈: 진행률 바만 표시 */}
      {size === 'M' && (
        <>
          <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                project.status === 'COMPLETED' ? 'bg-green-400' : 'bg-blue-400'
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <p className='text-right text-gray-500 text-xs'>
            {project.progress}% 完了
          </p>
        </>
      )}

      {/* S 사이즈: 진행률 숫자로 표시 */}
      {size === 'S' && (
        <p
          className={`absolute bottom-2 right-3 font-semibold text-[11px] ${
            project.status === 'COMPLETED' ? 'text-green-400' : 'text-blue-500'
          }`}
        >
          {project.progress}%
        </p>
      )}
    </div>
  );
}
