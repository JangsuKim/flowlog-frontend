import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// ✅ 로그인 요청
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const data = response.data;

  // ✅ 토큰과 유저 정보 저장
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);

    const userInfo = {
      id: data.userId,
      email: data.email,
      name: data.name,
      role: data.role,
      teamId: data.teamId,
      teamName: data.teamName,
    };
    localStorage.setItem('user', JSON.stringify(userInfo));

    console.log('✅ 로그인 성공: accessToken 및 user 정보 저장 완료');
  } else {
    console.warn('⚠️ accessToken이 응답에 포함되지 않았습니다.');
  }

  return data;
};

// ✅ 회원가입 요청
export async function register(
  email: string,
  password: string,
  name: string,
  teamId: number
) {
  const res = await api.post('/auth/register', {
    email,
    password,
    name,
    teamId,
  });
  return res.data;
}

export default api;
