import axios from 'axios';

const rawUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = rawUrl
  ? rawUrl.endsWith('/api/tasks')
    ? rawUrl
    : `${rawUrl.replace(/\/$/, '')}/api/tasks`
  : '/api/tasks';

const LOCAL_STORAGE_KEY = 'taskflow_cached_tasks';

const getInitialTasks = () => {
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  return [
    {
      _id: 'local_1',
      title: 'Q4 Product Roadmap & Architecture Review',
      description: 'Review system scalability, database indexing, and microservices decoupling strategy.',
      dateTime: new Date(now.getTime() - 7 * dayMs).toISOString(),
      priority: 'High',
      status: 'Completed',
    },
    {
      _id: 'local_2',
      title: 'Weekly Executive Project Sync',
      description: 'Present key milestone achievements, pull request velocity, and team deliverables.',
      dateTime: new Date(now.getTime() - 6 * dayMs).toISOString(),
      priority: 'Medium',
      status: 'Completed',
    },
    {
      _id: 'local_3',
      title: 'Design System & UI Component Polish',
      description: 'Finalize accessible color tokens, glassmorphic card variants, and micro-interactions.',
      dateTime: new Date(now.getTime() - 1 * dayMs).toISOString(),
      priority: 'High',
      status: 'Completed',
    },
    {
      _id: 'local_4',
      title: 'Optimize Mobile Touch Gestures & Animation',
      description: 'Refine swipe-to-delete velocity threshold and gesture responsiveness for touch devices.',
      dateTime: new Date(now.getTime()).toISOString(),
      priority: 'High',
      status: 'In Progress',
    },
    {
      _id: 'local_5',
      title: 'Security Audit & API Rate Limiting',
      description: 'Audit REST endpoints, sanitize query inputs, and configure security headers.',
      dateTime: new Date(now.getTime() + 1 * dayMs).toISOString(),
      priority: 'Medium',
      status: 'In Progress',
    },
    {
      _id: 'local_6',
      title: 'Production Multi-Region Deployment & Monitoring',
      description: 'Set up uptime monitoring, alerting webhooks, and automated CI/CD pipeline.',
      dateTime: new Date(now.getTime() + 5 * dayMs).toISOString(),
      priority: 'Low',
      status: 'In Progress',
    },
  ];
};

const getLocalTasks = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialTasks();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialTasks();
  }
};

const saveLocalTasks = (tasks) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
};

export const fetchTasks = async (searchQuery = '') => {
  try {
    const url = searchQuery ? `${API_BASE_URL}?search=${encodeURIComponent(searchQuery)}` : API_BASE_URL;
    const res = await axios.get(url, { timeout: 3500 });
    if (res.data && Array.isArray(res.data.data)) {
      saveLocalTasks(res.data.data);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend unavailable, falling back to local storage:', err.message);
  }

  let local = getLocalTasks();
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    local = local.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }
  return { success: true, count: local.length, data: local };
};

export const createTask = async (taskData) => {
  try {
    const res = await axios.post(API_BASE_URL, taskData, { timeout: 3500 });
    if (res.data && res.data.data) {
      const local = getLocalTasks();
      saveLocalTasks([...local, res.data.data]);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend unavailable, saving task locally:', err.message);
  }

  const newTask = {
    ...taskData,
    _id: 'task_' + Date.now(),
    dateTime: taskData.dateTime || new Date().toISOString(),
    status: taskData.status || 'In Progress',
    priority: taskData.priority || 'Medium',
    createdAt: new Date().toISOString(),
  };
  const local = getLocalTasks();
  local.push(newTask);
  saveLocalTasks(local);
  return { success: true, data: newTask };
};

export const updateTask = async (id, taskData) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/${id}`, taskData, { timeout: 3500 });
    if (res.data && res.data.data) {
      const local = getLocalTasks().map((t) => (t._id === id ? res.data.data : t));
      saveLocalTasks(local);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend unavailable, updating task locally:', err.message);
  }

  const local = getLocalTasks().map((t) => (t._id === id ? { ...t, ...taskData } : t));
  saveLocalTasks(local);
  const updated = local.find((t) => t._id === id);
  return { success: true, data: updated };
};

export const toggleTaskStatus = async (id) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/${id}/status`, {}, { timeout: 3500 });
    if (res.data && res.data.data) {
      const local = getLocalTasks().map((t) => (t._id === id ? res.data.data : t));
      saveLocalTasks(local);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend unavailable, toggling status locally:', err.message);
  }

  const local = getLocalTasks().map((t) => {
    if (t._id === id) {
      return { ...t, status: t.status === 'Completed' ? 'In Progress' : 'Completed' };
    }
    return t;
  });
  saveLocalTasks(local);
  const updated = local.find((t) => t._id === id);
  return { success: true, data: updated };
};

export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/${id}`, { timeout: 3500 });
    const local = getLocalTasks().filter((t) => t._id !== id);
    saveLocalTasks(local);
    return res.data;
  } catch (err) {
    console.warn('Backend unavailable, deleting task locally:', err.message);
  }

  const local = getLocalTasks().filter((t) => t._id !== id);
  saveLocalTasks(local);
  return { success: true, data: {} };
};
