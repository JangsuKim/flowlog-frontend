import React, { useState } from 'react';
import { register } from '../api/auth';

export default function RegisterModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    try {
      await register(email, password, name);
      alert('登録が完了しました!');
      onClose();
    } catch {
      setError('登録に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50
                 animate-fadeIn'
    >
      <div
        className='bg-white rounded-2xl shadow-2xl w-[420px] p-8 relative transform
                   transition-all duration-300 ease-out scale-95 animate-scaleIn'
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-white hover:text-gray-700 text-xl transition'
        >
          ✕
        </button>

        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          メンバー登録
        </h2>

        {error && (
          <p className='text-red-500 text-sm text-center bg-red-50 py-2 rounded mb-3'>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* 名前 */}
          <div>
            <label className='block text-sm font-medium text-gray-700 text-left mb-1'>
              名前
            </label>
            <input
              type='text'
              placeholder='名前を入力してください'
              className='w-full p-3 border text-gray-700 border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 text-left mb-1'>
              メールアドレス
            </label>
            <input
              type='email'
              placeholder='example@flowlog.com'
              className='w-full p-3 border text-gray-700 border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 text-left mb-1'>
              パスワード
            </label>
            <input
              type='password'
              placeholder='パスワードを入力してください'
              className='w-full p-3 border text-gray-700 border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 text-left mb-1'>
              パスワード確認
            </label>
            <input
              type='password'
              placeholder='パスワードを再入力してください'
              className='w-full p-3 border text-gray-700 border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full text-white p-3 rounded-lg font-semibold 
                       hover:bg-blue-600 transition'
          >
            メンバー登録
          </button>
        </form>
      </div>
    </div>
  );
}
