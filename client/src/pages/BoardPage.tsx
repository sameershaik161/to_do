import { useDispatch, useSelector } from 'react-redux';
import { useGetTasksQuery } from '../features/tasks/taskApi';
import { openCreateModal, setPriorityFilter } from '../features/tasks/taskSlice';
import type { RootState } from '../app/store';
import TaskColumn from '../components/TaskColumn';
import TaskModal from '../components/TaskModal';
import type { TaskStatus, TaskPriority } from '../types/task';
import { TASK_STATUSES, TASK_PRIORITIES } from '../types/task';

const COLUMN_COLORS: Record<TaskStatus, string> = {
  'todo': '#6366f1',
  'in-progress': '#f59e0b',
  'done': '#22c55e',
};

export default function BoardPage() {
  const dispatch = useDispatch();
  const priorityFilter = useSelector((state: RootState) => state.taskUi.priorityFilter);

  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

  // Filter by priority
  const filteredTasks = priorityFilter === 'All'
    ? tasks
    : tasks.filter((t) => t.priority === priorityFilter);

  const getTasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((t) => t.status === status);

  if (isLoading) {
    return (
      <div className="board-loading">
        <div className="spinner" />
        <p>Loading tasks…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="board-error">
        <p>⚠️ Could not connect to server. Make sure the backend is running on port 5000.</p>
      </div>
    );
  }

  return (
    <div className="board-page">
      {/* Header */}
      <header className="board-header">
        <div className="header-left">
          <div className="header-brand">
            <span className="brand-icon">📋</span>
            <h1 className="brand-title">TaskBoard</h1>
          </div>
          <p className="board-subtitle">Stay organized, ship faster</p>
        </div>
        <div className="header-right">
          {/* Priority Filter */}
          <div className="filter-group">
            <label htmlFor="priority-filter" className="filter-label">Filter:</label>
            <select
              id="priority-filter"
              className="filter-select"
              value={priorityFilter}
              onChange={(e) =>
                dispatch(setPriorityFilter(e.target.value as TaskPriority | 'All'))
              }
            >
              <option value="All">All Priorities</option>
              {TASK_PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <button
            id="add-task-btn"
            className="btn btn-primary btn-add"
            onClick={() => dispatch(openCreateModal())}
          >
            + Add Task
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div className="stats-bar">
        {TASK_STATUSES.map(({ value, label }) => (
          <div key={value} className="stat-chip">
            <span className="stat-dot" style={{ backgroundColor: COLUMN_COLORS[value] }} />
            <span className="stat-label">{label}</span>
            <span className="stat-count">{getTasksByStatus(value).length}</span>
          </div>
        ))}
        <div className="stat-chip">
          <span className="stat-label">Total</span>
          <span className="stat-count">{filteredTasks.length}</span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="board-columns">
        {TASK_STATUSES.map(({ value, label }) => (
          <TaskColumn
            key={value}
            status={value}
            label={label}
            tasks={getTasksByStatus(value)}
            accentColor={COLUMN_COLORS[value]}
          />
        ))}
      </div>

      {/* Modal */}
      <TaskModal />
    </div>
  );
}
