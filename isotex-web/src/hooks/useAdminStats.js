import { useState, useEffect } from 'react';

const getAuthHeaders = () => {
  const token = localStorage.getItem('ISOTEX_admin_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const useAdminStats = () => {
  const [stats, setStats] = useState({
    wasteDiverted: '0',
    carbonOffset: '0',
    activeSpecs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats', { headers: getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
