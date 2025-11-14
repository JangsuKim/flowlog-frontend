// src/components/project-detail/TaskDrawer.tsx
import type { Task } from '../../types/task';
import { X } from 'lucide-react';

interface Props {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (t: Task) => void;
}

export default function TaskDrawer({ task, open, onClose, onSave }: Props) {
  if (!open || !task) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-end'>
      <div className='absolute inset-0 bg-black/20' onClick={onClose} />

      <div className='relative w-[420px] h-full bg-white shadow-xl p-6 overflow-y-auto animate-slide-left'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className='text-xl font-semibold mb-4'>{task.title}</h2>

        {/* 설명 */}
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-1'>説明</label>
          <textarea
            className='w-full border rounded-md p-2 text-sm h-24'
            value={task.description ?? ''}
            onChange={(e) => onSave({ ...task, description: e.target.value })}
          />
        </div>

        {/* 상태 */}
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-1'>ステータス</label>
          <select
            className='border rounded-md p-2 text-sm w-full'
            value={task.status}
            onChange={(e) =>
              onSave({ ...task, status: e.target.value as Task['status'] })
            }
          >
            <option value='BACKLOG'>未対応</option>
            <option value='IN_PROGRESS'>進行中</option>
            <option value='BEFORE_REVIEW'>レビュー前</option>
            <option value='IN_REVIEW'>レビュー中</option>
            <option value='PENDING'>保留</option>
            <option value='PRE_RELEASE'>リリース前</option>
            <option value='DONE'>完了</option>
          </select>
        </div>

        {/* 담당자 */}
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-1'>担当者</label>
          <input
            className='border rounded-md p-2 text-sm w-full'
            value={task.assigneeName ?? ''}
            onChange={(e) => onSave({ ...task, assigneeName: e.target.value })}
          />
        </div>

        {/* Due Date */}
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-1'>Due Date</label>
          <input
            type='date'
            className='border rounded-md p-2 text-sm w-full'
            value={task.dueDate ?? ''}
            onChange={(e) => onSave({ ...task, dueDate: e.target.value })}
          />
        </div>

        <button className='text-red-500 text-sm mt-4'>タスク削除</button>
      </div>
    </div>
  );
}
