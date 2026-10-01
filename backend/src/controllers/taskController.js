const Task = require('../models/Task');
const { getIsInMemory, getMemoryStore, setMemoryStore } = require('../config/db');

// Sample initial data generator for in-memory mode
const initMemoryStoreIfEmpty = () => {
  let store = getMemoryStore();
  if (store.length === 0) {
    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;
    
    // Generate dates across 3 weeks (previous week, current week, next week)
    const initialTasks = [
      {
        _id: 'mem_1',
        title: 'Q4 Product Roadmap & Architecture Review',
        description: 'Review system scalability, database indexing, and microservices decoupling strategy.',
        dateTime: new Date(now.getTime() - 7 * dayMs),
        priority: 'High',
        status: 'Completed',
        createdAt: new Date(now.getTime() - 8 * dayMs),
        updatedAt: new Date(now.getTime() - 7 * dayMs),
      },
      {
        _id: 'mem_2',
        title: 'Weekly Executive Project Sync',
        description: 'Present key milestone achievements, pull request velocity, and team deliverables.',
        dateTime: new Date(now.getTime() - 6 * dayMs),
        priority: 'Medium',
        status: 'Completed',
        createdAt: new Date(now.getTime() - 7 * dayMs),
        updatedAt: new Date(now.getTime() - 6 * dayMs),
      },
      {
        _id: 'mem_3',
        title: 'Design System & UI Component Polish',
        description: 'Finalize accessible color tokens, glassmorphic card variants, and micro-interactions.',
        dateTime: new Date(now.getTime() - 1 * dayMs),
        priority: 'High',
        status: 'Completed',
        createdAt: new Date(now.getTime() - 2 * dayMs),
        updatedAt: new Date(now.getTime() - 1 * dayMs),
      },
      {
        _id: 'mem_4',
        title: 'Optimize Mobile Touch Gestures & Animation',
        description: 'Refine swipe-to-delete velocity threshold and gesture responsiveness for touch devices.',
        dateTime: new Date(now.getTime() + 1 * dayMs),
        priority: 'High',
        status: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'mem_5',
        title: 'Security Audit & API Rate Limiting',
        description: 'Audit REST endpoints, sanitize query inputs, and configure security headers.',
        dateTime: new Date(now.getTime() + 2 * dayMs),
        priority: 'Medium',
        status: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'mem_6',
        title: 'Production Multi-Region Deployment & Monitoring',
        description: 'Set up uptime monitoring, alerting webhooks, and automated CI/CD pipeline.',
        dateTime: new Date(now.getTime() + 8 * dayMs),
        priority: 'Low',
        status: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    setMemoryStore(initialTasks);
  }
};

// @desc    Get all tasks (supports optional ?search= query)
// @route   GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const { search } = req.query;

    if (getIsInMemory()) {
      initMemoryStoreIfEmpty();
      let store = [...getMemoryStore()];
      if (search && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        store = store.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            (t.description && t.description.toLowerCase().includes(query))
        );
      }
      // Sort by date ascending
      store.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      return res.status(200).json({ success: true, count: store.length, data: store });
    }

    let filter = {};
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter = {
        $or: [{ title: regex }, { description: regex }],
      };
    }

    const tasks = await Task.find(filter).sort({ dateTime: 1 });
    return res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, dateTime, priority, status } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Title is mandatory' });
    }
    if (!dateTime) {
      return res.status(400).json({ success: false, error: 'Date & Time is mandatory' });
    }

    if (getIsInMemory()) {
      initMemoryStoreIfEmpty();
      const store = getMemoryStore();
      const newTask = {
        _id: 'mem_' + Date.now(),
        title: title.trim(),
        description: description ? description.trim() : '',
        dateTime: new Date(dateTime),
        priority: priority || 'Medium',
        status: status || 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      store.push(newTask);
      setMemoryStore(store);
      return res.status(201).json({ success: true, data: newTask });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      dateTime: new Date(dateTime),
      priority: priority || 'Medium',
      status: status || 'In Progress',
    });

    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dateTime, priority, status } = req.body;

    if (getIsInMemory()) {
      initMemoryStoreIfEmpty();
      const store = getMemoryStore();
      const index = store.findIndex((t) => t._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }

      if (title !== undefined) store[index].title = title.trim();
      if (description !== undefined) store[index].description = description.trim();
      if (dateTime !== undefined) store[index].dateTime = new Date(dateTime);
      if (priority !== undefined) store[index].priority = priority;
      if (status !== undefined) store[index].status = status;
      store[index].updatedAt = new Date();

      setMemoryStore(store);
      return res.status(200).json({ success: true, data: store[index] });
    }

    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (dateTime !== undefined) task.dateTime = new Date(dateTime);
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;

    await task.save();
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Toggle task status (In Progress <-> Completed)
// @route   PATCH /api/tasks/:id/status
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsInMemory()) {
      initMemoryStoreIfEmpty();
      const store = getMemoryStore();
      const index = store.findIndex((t) => t._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }

      store[index].status = store[index].status === 'Completed' ? 'In Progress' : 'Completed';
      store[index].updatedAt = new Date();
      setMemoryStore(store);
      return res.status(200).json({ success: true, data: store[index] });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    task.status = task.status === 'Completed' ? 'In Progress' : 'Completed';
    await task.save();

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsInMemory()) {
      initMemoryStoreIfEmpty();
      let store = getMemoryStore();
      const initialLen = store.length;
      store = store.filter((t) => t._id !== id);
      if (store.length === initialLen) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      setMemoryStore(store);
      return res.status(200).json({ success: true, data: {} });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
