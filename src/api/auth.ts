import { api } from './axiosConfig';

type Role = 'LEADER' | 'MEMBER';

export interface LoginResponse {
  accessToken: string;
  tokenType: string; // "Bearer"
  userId: number;
  email: string;
  name: string;
  role: Role | { name: Role }; // enum 직렬화 케이스 대비
  teamId?: number | null;
  teamName?: string | null;
}

// ✅ 로그인 요청
export const login = async (email: string, password: string) => {
  const { data } = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
  });

  // role 문자열로 정규화
  const role: Role =
    typeof data.role === 'string' ? data.role : (data.role?.name as Role);

  // 토큰 저장
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  } else {
    console.warn('⚠️ accessToken이 응답에 포함되지 않았습니다.');
  }

  // 사용자 정보 저장
  const userInfo = {
    id: data.userId,
    email: data.email,
    name: data.name,
    role,
    teamId: data.teamId ?? null,
    teamName: data.teamName ?? null,
  };
  localStorage.setItem('user', JSON.stringify(userInfo));
  console.log('✅ 로그인 성공: accessToken 및 user 정보 저장 완료');

  return { ...data, role }; // 정규화된 role 반환
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
