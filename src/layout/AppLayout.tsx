import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-screen bg-gray-100 overflow-hidden'>
      {/* ✅ 사이드바 (고정) */}
      <Sidebar />

      {/* ✅ 메인 영역 (헤더 + 콘텐츠) */}
      <div className='flex flex-col flex-1 h-full'>
        {/* 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className='flex-1 w-full h-full overflow-y-auto bg-gray-50 p-8'>
          {children}
        </main>
      </div>
    </div>
  );
}
