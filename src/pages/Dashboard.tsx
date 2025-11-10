import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project';
import AppLayout from '../layout/AppLayout';
import ProjectCreateModal from '../modal/ProjectCreateModal';
import ProjectEditModal from '../modal/ProjectEditModal';
import { api } from '../api/axiosConfig';

// ✅ 팀별 그룹화 함수
function groupByTeam(projects: Project[]) {
  return projects.reduce((acc, project) => {
    const teamKey = project.teamName ?? '未設定';
    (acc[teamKey] = acc[teamKey] || []).push(project);
    return acc;
  }, {} as Record<string, Project[]>);
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [cardSize, setCardSize] = useState<'L' | 'M' | 'S'>('L');
  const [statusFilter, setStatusFilter] = useState<'IN_PROGRESS' | 'COMPLETED'>(
    'IN_PROGRESS'
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  // ✅ 로그인 유저 정보 로드
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const hasToken = !!localStorage.getItem('accessToken');

  useEffect(() => {
    if (!hasToken) {
      setError('ログインが必要です。');
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params =
          user.role === 'LEADER' ? undefined : { teamId: user.teamId };
        const { data } = await api.get<Project[]>('/projects', { params });
        setProjects(data);
        setError('');
      } catch (err) {
        console.error('❌ プロジェクト取得失敗:', err);
        setError('プロジェクトデータを取得できませんでした。');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [hasToken, user.role, user.teamId]);

  const handleProjectSuccess = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const groupedProjects = useMemo(() => groupByTeam(projects), [projects]);

  if (loading) {
    return (
      <AppLayout>
        <p className='text-gray-500 text-sm'>読み込み中...</p>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <p className='text-red-500 text-sm'>{error}</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* 헤더 영역 */}
      <div className='flex items-start justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Flow Board</h1>

        {/* 오른쪽: 드롭다운 */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition'
            >
              新規作成
            </button>
          </div>
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

          {/* 카드 사이즈 */}
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
      {user.role === 'LEADER' ? (
        Object.entries(groupedProjects).map(([team, teamProjects]) => (
          <section key={team} className='mb-10'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
              {team} Team
            </h2>
            <div className='flex flex-wrap gap-6'>
              {teamProjects
                .filter((p) => p.status === statusFilter)
                .map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    size={cardSize}
                    onEdit={() => {
                      setSelectedProject(p);
                      setIsEditOpen(true);
                    }}
                    onOpen={() => navigate(`/projects/${p.id}`)}
                  />
                ))}
              {teamProjects.filter((p) => p.status === statusFilter).length ===
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
            {user.teamName} Team
          </h2>
          <div className='flex flex-wrap gap-6'>
            {projects
              .filter((p) => p.status === statusFilter)
              .map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  size={cardSize}
                  onEdit={() => {
                    setSelectedProject(p);
                    setIsEditOpen(true);
                  }}
                  onOpen={() => navigate(`/projects/${p.id}`)}
                />
              ))}
            {projects.filter((p) => p.status === statusFilter).length === 0 && (
              <p className='text-gray-400 text-sm ml-2'>
                該当するプロジェクトがありません。
              </p>
            )}
          </div>
        </section>
      )}

      {/* ✅ 생성 모달 */}
      <ProjectCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleProjectSuccess}
      />

      {/* ✅ 편집 모달 */}
      {selectedProject && (
        <ProjectEditModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
          onSuccess={(updated) => {
            setProjects((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
          }}
        />
      )}
    </AppLayout>
  );
}

/* ✅ 프로젝트 카드 */
function ProjectCard({
  project,
  size,
  onEdit,
  onOpen,
}: {
  project: Project;
  size: 'L' | 'M' | 'S';
  onEdit?: () => void;
  onOpen?: () => void;
}) {
  const sizeStyles = {
    L: 'w-[260px] h-[180px] p-6 text-base relative', // relative 추가
    M: 'w-[260px] h-[100px] p-4 text-sm relative', // relative 추가
    S: 'w-[120px] h-[80px] p-3 text-xs relative',
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onOpen) {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100 ${sizeStyles[size]}`}
    >
      <h3
        className={`
    relative flex items-center justify-between
    ${size === 'S' ? 'text-sm' : size === 'M' ? 'text-lg' : 'text-xl'}
    font-semibold text-gray-700 mb-2
  `}
      >
        <span className='truncate'>{project.name}</span>

        {/* ✎ 흑백 연필 아이콘 (버튼 아님) */}
        {onEdit && (
          <div
            role='button'
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onEdit();
              }
            }}
            className='
                        [all:unset] absolute right-0
                        inline-flex items-center justify-center
                        w-6 h-6 rounded-full
                        text-gray-500 hover:text-gray-700
                        hover:bg-gray-100
                        transition-all duration-200
                        cursor-pointer
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                      '
            aria-label='編集'
            title='編集'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='20'
              height='20'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <path d='M3 21l1.5-5.5L16.5 3.5a2.121 2.121 0 0 1 3 3L7.5 18.5 3 21z' />
              <path d='M12 21h9' />
            </svg>
          </div>
        )}
      </h3>

      {size === 'L' && (
        <>
          <p className='text-gray-500 mb-1'>担当者: {project.ownerName}</p>
          <p className='text-gray-500 mb-3'>期限: {project.dueDate}</p>

          <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                project.status === 'COMPLETED' ? 'bg-green-400' : 'bg-blue-400'
              }`}
              style={{ width: `${project.progress ?? 0}%` }}
            />
          </div>
          <p className='text-right text-gray-500 text-xs'>
            {project.progress ?? 0}% 完了
          </p>
        </>
      )}

      {size === 'M' && (
        <>
          <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                project.status === 'COMPLETED' ? 'bg-green-400' : 'bg-blue-400'
              }`}
              style={{ width: `${project.progress ?? 0}%` }}
            />
          </div>
          <p className='text-right text-gray-500 text-xs'>
            {project.progress ?? 0}% 完了
          </p>
        </>
      )}

      {size === 'S' && (
        <p
          className={`absolute bottom-2 right-3 font-semibold text-[11px] ${
            project.status === 'COMPLETED' ? 'text-green-400' : 'text-blue-500'
          }`}
        >
          {project.progress ?? 0}%
        </p>
      )}
    </div>
  );
}
