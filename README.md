# Task Board

A full-stack Trello-like Task Board built with React + TypeScript (frontend) and Node.js + Express + MongoDB (backend).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript + Vite |
| State | Redux Toolkit + RTK Query |
| Forms | react-hook-form (controlled components) |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB + Mongoose |

## Features

- ✅ Create tasks (title, description, priority, due date, status)
- ✅ Kanban board grouped by: **To Do → In Progress → Done**
- ✅ Drag & drop cards across columns to update status
- ✅ Edit task details via modal form
- ✅ Delete tasks
- ✅ Filter tasks by priority (Low / Medium / High)
- ✅ Overdue task indicator
- ✅ Fully typed — no `any`

## Project Structure

```
To_Do_list/
├── client/client/          # React frontend (Vite)
│   └── src/
│       ├── app/store.ts          # Redux store
│       ├── features/tasks/       # RTK Query API + UI slice
│       ├── components/           # TaskCard, TaskColumn, TaskForm, TaskModal
│       ├── pages/BoardPage.tsx   # Main Kanban board
│       └── types/task.ts         # Shared TS interfaces
└── server/                 # Express backend
    └── src/
        ├── models/task.model.ts
        ├── controllers/task.controller.ts
        ├── routes/task.routes.ts
        ├── app.ts
        └── server.ts
```

## Prerequisites

- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

## Setup & Run

### 1. Backend

```bash
cd server

# Install dependencies
npm install

# Configure environment
# Edit .env — set your MONGO_URI if using Atlas:
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/taskboard

# Start dev server (auto-restarts on changes)
npm run dev
```

> Server will run on `http://localhost:5000`

### 2. Frontend

Open a **new terminal**:

```bash
cd client/client

# Install dependencies
npm install

# Start dev server
npm run dev
```

> App will open on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get single task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/health` | Health check |

## Task Schema

```typescript
{
  title: string;        // required, max 100 chars
  description: string;  // optional
  priority: 'Low' | 'Medium' | 'High';
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;      // ISO date string
}
```
