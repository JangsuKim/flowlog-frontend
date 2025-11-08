import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import RegisterModal from '../modal/RegisterModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('accessToken', data.accessToken);
      alert('로그인 성공!');
      console.log('로그인 성공:', data);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen w-screen bg-linear-to-br from-blue-50 to-blue-100'>
      <div className='bg-white shadow-2xl rounded-2xl w-[420px] p-10'>
        <h1 className='text-3xl font-extrabold text-center text-gray-800 mb-2'>
          FlowLog
        </h1>
        <p className='text-center text-gray-500 mb-8 text-sm'>
          계정 정보를 입력해 로그인하세요
        </p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {error && (
            <p className='text-red-500 text-sm text-center bg-red-50 py-2 rounded'>
              {error}
            </p>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              이메일
            </label>
            <input
              type='email'
              placeholder='example@flowlog.com'
              className='w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              비밀번호
            </label>
            <input
              type='password'
              placeholder='비밀번호를 입력하세요'
              className='w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition'
          >
            로그인
          </button>
        </form>

        <p className='text-center text-gray-500 text-sm mt-6'>
          계정이 없으신가요?{' '}
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              setShowRegister(true);
            }}
            className='text-blue-500 hover:underline'
          >
            회원가입
          </a>
          {showRegister && (
            <RegisterModal onClose={() => setShowRegister(false)} />
          )}
        </p>
      </div>
    </div>
  );
}
