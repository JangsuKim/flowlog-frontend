import { useEffect, useState } from 'react';
import { api } from '../api/axiosConfig';
import type { Project } from '../types/project';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSuccess: (updated: Project) => void;
}

interface Team {
  id: number;
  name: string;
}

export default function ProjectEditModal({
  isOpen,
  onClose,
  project,
  onSuccess,
}: Props) {
  const [name, setName] = useState(project.name);
  const [teamId, setTeamId] = useState<number | null>(project.teamId);
  const [dueDate, setDueDate] = useState(project.dueDate ?? '');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  // 모달 열릴 때마다 최신 팀 목록 + 초기값 동기화
  useEffect(() => {
    if (!isOpen) return;

    setName(project.name);
    setTeamId(project.teamId ?? null);
    setDueDate(project.dueDate ?? '');

    const fetchTeams = async () => {
      try {
        const res = await api.get<Team[]>('/teams');
        setTeams(res.data);
      } catch (err) {
        console.error('❌ チーム情報の取得に失敗:', err);
      }
    };
    fetchTeams();
  }, [isOpen, project]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name.trim()) return alert('プロジェクト名を入力してください。');
    if (teamId == null) return alert('チームを選択してください。');

    setLoading(true);
    try {
      const payload = {
        name,
        dueDate,
        teamId,
      };

      const { data } = await api.put<Project>(
        `/projects/${project.id}`,
        payload
      );

      // teamName 폴백 처리(백엔드가 보장하지 못하는 경우 대비)
      const updated: Project = {
        ...project,
        ...data,
        teamName: data.teamName ?? (data.teamId ? `Team ${data.teamId}` : null),
      };

      onSuccess(updated);
      onClose();
    } catch (err) {
      console.error('❌ プロジェクト更新失敗:', err);
      alert('更新に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800/30 flex justify-center items-center z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-lg p-6 w-[420px]'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700'>
          プロジェクト編集
        </h2>

        <div className='space-y-4'>
          {/* タイトル */}
          <div>
            <label className='block text-sm text-gray-600 mb-1'>タイトル</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300'
              placeholder='例: FlowLog Backend'
            />
          </div>

          {/* チーム */}
          <div>
            <label className='block text-sm text-gray-600 mb-1'>チーム</label>
            <select
              value={teamId ?? ''}
              onChange={(e) =>
                setTeamId(e.target.value ? Number(e.target.value) : null)
              }
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300'
            >
              <option value=''>チームを選択</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* 期限 */}
          <div>
            <label className='block text-sm text-gray-600 mb-1'>期限</label>
            <input
              type='date'
              value={dueDate ?? ''}
              onChange={(e) => setDueDate(e.target.value)}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300'
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className='mt-6 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100'
          >
            キャンセル
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className='px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60'
          >
            {loading ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
