import { API_URLS } from './config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('ISOTEX_admin_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const projectsApi = {
  getProjects: async () => {
    const res = await fetch(API_URLS.projects, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  addProject: async (projectData) => {
    const res = await fetch(API_URLS.projects, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    if (!res.ok) throw new Error('Failed to add project');
    return res.json();
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_URLS.projects}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return true;
  }
};
