// src/pages/ProjectDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { getProjectById } from '../api/projects';
import type { Project } from '../types/project';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getProjectById(Number(id));
        setProject(data);
        setError('');
      } catch (e) {
        console.error('❌ Project fetch failed:', e);
        setError('プロジェクトが見つかりません。');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <AppLayout>
      {loading && <p className='text-gray-500 text-sm p-6'>読み込み中...</p>}
      {!loading && error && <p className='text-red-500 text-sm p-6'>{error}</p>}
      {!loading && !error && project && (
        <div className='p-6'>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            {project.name}
          </h1>
          <p className='text-gray-500 text-sm mb-6'>
            担当者: {project.ownerName ?? '-'} ・ 期限: {project.dueDate ?? '-'}{' '}
            ・ チーム: {project.teamName ?? '-'}
          </p>

          {/* 개요 카드 예시 */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='md:col-span-2 bg-white rounded-2xl p-5 shadow-sm border'>
              <h2 className='font-semibold mb-3'>概要</h2>
              <p className='text-gray-600 text-sm whitespace-pre-line'>
                {project.description ?? '説明がまだありません。'}
              </p>
            </div>

            <div className='bg-white rounded-2xl p-5 shadow-sm border'>
              <h3 className='font-semibold mb-3'>進捗</h3>
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
          </div>
        </div>
      )}
    </AppLayout>
  );
}
