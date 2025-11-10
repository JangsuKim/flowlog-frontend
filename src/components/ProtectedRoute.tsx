import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // 로그인 안 되어 있으면 로그인 페이지로 이동
    return <Navigate to='/login' replace />;
  }

  // 로그인되어 있으면 원래 페이지 표시
  return children;
}
