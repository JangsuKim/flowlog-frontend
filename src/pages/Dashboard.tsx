import React from 'react';

export default function Dashboard() {
  return (
    <div className='flex items-center justify-center min-h-screen w-screen bg-linear-to-br from-green-50 to-green-100'>
      <div className='text-center'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Dashboard
        </h1>
        <p className='text-gray-600 text-lg'>로그인에 성공하셨습니다 🎉</p>
      </div>
    </div>
  );
}
