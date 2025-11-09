import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const token = localStorage.getItem('accessToken');

export async function createProject(project: {
  name: string;
  description?: string;
  dueDate?: string;
  teamId?: number;
}) {
  const res = await axios.post(`${API_BASE_URL}/projects`, project, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

export async function getProjects() {
  const res = await axios.get(`${API_BASE_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
