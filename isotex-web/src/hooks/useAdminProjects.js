import { useState, useEffect, useCallback } from 'react';
import { projectsApi } from '../api/adminProjectsApi';

export const useAdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const data = await projectsApi.getProjects();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (data) => {
    const newProject = await projectsApi.addProject(data);
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const deleteProject = async (id) => {
    await projectsApi.deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return { projects, loading, addProject, deleteProject, refresh: fetchProjects };
};
