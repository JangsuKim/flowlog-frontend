// src/components/project-detail/ProjectHeader.tsx
import type { ProjectDetail } from '../../types/projectDetail';

interface Props {
  project: ProjectDetail;
}

export default function ProjectHeader({ project }: Props) {
  return (
    <section className='bg-white rounded-2xl p-6 shadow-sm border'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* =============================== */}
        {/* 🔵 왼쪽 3 영역 */}
        {/* =============================== */}
        <div className='md:col-span-3 space-y-6'>
          {/* 担当者 / チーム */}
          <div className='space-y-1 text-gray-700'>
            <p>
              <span className='font-semibold'>担当者:</span>{' '}
              {project.ownerName ?? '-'}
            </p>
            <p>
              <span className='font-semibold'>チーム:</span>{' '}
              {project.teamName ?? '-'}
            </p>
          </div>

          {/* 概要 */}
          <div>
            <p className='font-semibold text-gray-800 mb-1'>概要</p>
            <p className='text-gray-600 text-sm whitespace-pre-line'>
              {project.description ?? '説明がまだありません。'}
            </p>
          </div>
        </div>

        {/* =============================== */}
        {/* 🔵 오른쪽 1 영역 */}
        {/* =============================== */}
        <div className='md:col-span-1 space-y-6'>
          {/* 날짜 */}
          <div className='space-y-1 text-gray-700'>
            <p>
              <span className='font-semibold'>Start Date:</span>{' '}
              {project.startDate ?? '-'}
            </p>
            <p>
              <span className='font-semibold'>Due Date:</span>{' '}
              {project.dueDate ?? '-'}
            </p>
          </div>

          {/* 진행률 */}
          <div>
            <p className='text-sm font-medium mb-1 text-gray-700'>進捗</p>
            <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
              <div
                className={`h-3 rounded-full ${
                  project.status === 'COMPLETED'
                    ? 'bg-green-400'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${project.progress ?? 0}%` }}
              />
            </div>
            <p className='text-right text-gray-500 text-xs'>
              {project.progress ?? 0}% 完了
            </p>
          </div>

          {/* ⭐ 프로젝트 태그 (진행률 아래로 이동) */}
          {project.tags && project.tags.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-2'>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className='px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded-md border border-purple-200'
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
