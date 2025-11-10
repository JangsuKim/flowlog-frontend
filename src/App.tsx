// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* 로그인 페이지 (비보호) */}
      <Route path='/login' element={<Login />} />

      {/* 대시보드 (보호) */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* (추가 예정) 프로젝트 상세 (보호)
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetailPage />
          </ProtectedRoute>
        }
      /> */}

      {/* 루트/기타 → 대시보드로 */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}
