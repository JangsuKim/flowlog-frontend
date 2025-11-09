import { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newProject: any) => void;
}

interface Team {
  id: number;
  name: string;
}

export default function ProjectCreateModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState('');
  const [teamId, setTeamId] = useState<number | ''>('');
  const [dueDate, setDueDate] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('accessToken');
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  useEffect(() => {
    if (!isOpen) return; // 모달이 열릴 때만 실행
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(res.data);
      } catch (err) {
        console.error('❌ チーム情報の取得に失敗:', err);
      }
    };
    fetchTeams();
  }, [API_BASE_URL, token, isOpen]);

  if (!isOpen) return null;

  // ✅ 프로젝트 생성
  const handleSubmit = async () => {
    if (!name) {
      alert('プロジェクト名を入力してください。');
      return;
    }
    if (!teamId) {
      alert('チームを選択してください。');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/projects`,
        {
          name,
          dueDate,
          teamId,
          description: 'Dashboardから作成',
          status: 'IN_PROGRESS', // ✅ 자동 지정
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error('❌ プロジェクト作成失敗:', err);
      alert('作成に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800/30 flex justify-center items-center z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-lg p-6 w-[400px]'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700'>
          新規プロジェクト作成
        </h2>

        <div className='space-y-4'>
          {/* プロジェクト名 */}
          <div>
            <label className='block text-sm text-gray-600 mb-1'>
              プロジェクト名
            </label>
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
              value={teamId}
              onChange={(e) => setTeamId(Number(e.target.value))}
              className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300'
            >
              <option value=''>チームを選択</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* 期限 */}
          <div>
            <label className='block text-sm text-gray-600 mb-1'>期限</label>
            <input
              type='date'
              value={dueDate}
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
