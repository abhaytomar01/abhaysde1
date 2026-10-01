# ⚡ TaskFlow — Modern Weekly Task & Schedule Planner

**TaskFlow** is a modern, high-performance full-stack **MERN (MongoDB, Express, React, Node.js)** task management application engineered for productive individuals and engineering teams. Tasks are dynamically organized by calendar weeks (**Monday to Sunday**) with interactive weekly milestone cards, fluid swipe-to-delete gestures, instant real-time keyword search, and complete CRUD functionality.

---

## ✨ Features & Highlights

### 🗓️ Smart Weekly Organization (Monday to Sunday)
- **Automatic Date Grouping**: Tasks are organized into calendar weeks starting on **Monday 00:00** and concluding on **Sunday 23:59**.
- **Weekly Milestone Cards**: Each week provides:
  - Week Date Range & ISO Week Number (e.g. `Week 40 • Oct 05 – Oct 11, 2026`)
  - **Open Tasks** count (In Progress)
  - **Completed Tasks** count
  - Visual completion percentage bar
  - Smooth Expand / Collapse accordion view.

### 🎯 Comprehensive Task Management
- **Create & Schedule**:
  - `Title` (Mandatory)
  - `Description` (Optional)
  - `Date & Time` (Mandatory - places task into correct week automatically)
  - `Priority` (`Low`, `Medium`, `High` - color-coded badges)
- **Edit Modal**: Update any task attribute with real-time validation.
- **Swipe-to-Delete Gesture**:
  - **Touch & Drag**: Swipe left on mobile or drag left on desktop to reveal the quick delete action.
  - Quick action delete buttons for desktop accessibility.
- **Status Toggle**: Single-tap check toggle between `In Progress` and `Completed` with instant live metrics recalculation.

### 🔍 Real-Time Search & Quick Actions
- Instant search across all scheduled tasks matching keywords in `title` or `description`.
- Direct action shortcuts to view, edit, toggle status, or delete tasks directly from search results.

---

## 🏗️ Architecture & Tech Stack

```
abhaysde1/
├── backend/                  # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/db.js      # MongoDB connection with graceful in-memory fallback
│   │   ├── controllers/      # Task CRUD & Search controllers
│   │   ├── models/Task.js    # Mongoose Schema & Indexes
│   │   ├── routes/           # Express router
│   │   └── server.js         # Backend entry point
│   └── package.json
└── frontend/                 # React + Vite + Tailwind CSS UI
    ├── src/
    │   ├── components/       # Header, WeekCard, TaskItem, TaskModal, SearchView, SummaryStats
    │   ├── services/api.js   # Axios API client
    │   ├── utils/dateUtils.js# Monday-Sunday ISO week grouping logic
    │   ├── App.jsx           # Main stateful application
    │   └── index.css         # Glassmorphism design system & styling
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB (Optional: built-in fallback store allows running immediately without a live MongoDB instance)

### 1. Start Backend API
```bash
cd backend
npm install
npm start
```
> Server runs at `http://localhost:5000`

### 2. Start Frontend App
```bash
cd frontend
npm install
npm run dev -- --port 3000
```
> App runs at `http://localhost:3000`

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks (supports `?search=keyword`) |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/:id` | Update task details |
| `PATCH` | `/api/tasks/:id/status` | Toggle status (`In Progress` <-> `Completed`) |
| `DELETE` | `/api/tasks/:id` | Delete task by ID |

---

## 🌐 Production Deployment

### Backend (Render / Railway / AWS)
1. Deploy the `backend` folder as a Node.js Web Service.
2. Add environment variable `MONGODB_URI` with your MongoDB connection string.

### Frontend (Netlify Deployment via GitHub)
The project is pre-configured with `netlify.toml` and `_redirects` for automatic SPA deployment:

1. Go to [Netlify](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
2. Choose **GitHub** and select repository `abhaytomar01/abhaysde1`.
3. Netlify will auto-detect the configuration from `netlify.toml`:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. *(Optional)* Under **Site configuration > Environment variables**, add:
   - `VITE_API_URL`: URL of your deployed backend (e.g. `https://your-backend.onrender.com/api/tasks`).
   - *Note: If `VITE_API_URL` is omitted, the app runs in interactive local-storage demo mode so you can test all features immediately!*
5. Click **Deploy TaskFlow**!

