import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// ✅ 로그인 요청
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export async function register(email: string, password: string, name: string) {
  const res = await api.post('/auth/register', {
    email,
    password,
    name,
  });
  return res.data;
}
