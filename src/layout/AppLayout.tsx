import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

// src/layout/AppLayout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen w-full bg-gray-100 min-w-0'>
      <Sidebar />

      <div className='flex flex-col flex-1 h-full min-w-0'>
        <Header />

        <main className='flex-1 w-full h-full overflow-y-auto bg-gray-50 p-8'>
          {children}
        </main>
      </div>
    </div>
  );
}
