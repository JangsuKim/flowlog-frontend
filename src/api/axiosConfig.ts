// src/api/axiosConfig.ts
import axios from 'axios';

// export const api 로 명시 (named export)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// ✅ 요청 인터셉터: Authorization 헤더 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; // ← default로도 유지해도 됨
