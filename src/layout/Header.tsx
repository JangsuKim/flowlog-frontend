import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className='flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm'>
      <div className='w-20'></div>

      {/* 중앙 검색창 */}
      <div className='flex-1 flex justify-center'>
        <div className='relative w-full max-w-md'>
          <input
            type='text'
            placeholder='タスク・プロジェクトを検索'
            className='w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      {/* 오른쪽 사용자 */}
      <div className='flex items-center gap-4'>
        <Bell size={20} className='text-gray-500' />
        <div className='flex items-center gap-2'>
          <img
            src='https://i.pravatar.cc/40'
            alt='User'
            className='w-8 h-8 rounded-full'
          />
          <span className='font-medium text-gray-700'>Jangsoo</span>
        </div>
      </div>
    </header>
  );
}
