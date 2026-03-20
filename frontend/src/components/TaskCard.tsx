import { useDispatch } from 'react-redux';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../features/tasks/taskApi';
import { openEditModal } from '../features/tasks/taskSlice';
import type { Task, TaskStatus } from '../types/task';
import { TASK_STATUSES } from '../types/task';

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<string, string> = {
  Low: 'badge-low',
  Medium: 'badge-medium',
  High: 'badge-high',
};

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete "${task.title}"?`)) {
      await deleteTask(task._id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openEditModal(task));
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (task.status !== newStatus) {
      await updateTask({ id: task._id, data: { status: newStatus } });
    }
  };

  const getNextStatus = () => {
    const currentIndex = TASK_STATUSES.findIndex(s => s.value === task.status);
    if (currentIndex < TASK_STATUSES.length - 1) {
      return TASK_STATUSES[currentIndex + 1].value;
    }
    return null;
  };

  const getPreviousStatus = () => {
    const currentIndex = TASK_STATUSES.findIndex(s => s.value === task.status);
    if (currentIndex > 0) {
      return TASK_STATUSES[currentIndex - 1].value;
    }
    return null;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'done') return false;
    return new Date(task.dueDate) < new Date();
  };

  return (
    <div className="task-card">
      <div className="task-card-content">
        <div className="task-card-header">
          <span className={`priority-badge ${priorityColors[task.priority] ?? ''}`}>
            {task.priority}
          </span>
          <div className="task-card-actions">
            <button
              className="btn-icon btn-edit"
              onClick={handleEdit}
              title="Edit task"
            >
              ✏️
            </button>
            <button
              className="btn-icon btn-delete"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>

        <h3 className="task-title">{task.title}</h3>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        {task.dueDate && (
          <div className={`task-due-date ${isOverdue() ? 'overdue' : ''}`}>
            📅 {isOverdue() ? '⚠ Overdue · ' : ''}{formatDate(task.dueDate)}
          </div>
        )}

        {/* Status change buttons */}
        <div className="task-status-controls">
          {getPreviousStatus() && (
            <button
              className="btn-status btn-status-prev"
              onClick={() => handleStatusChange(getPreviousStatus()!)}
              title={`Move to ${getPreviousStatus()}`}
            >
              ← {TASK_STATUSES.find(s => s.value === getPreviousStatus())?.label}
            </button>
          )}
          {getNextStatus() && (
            <button
              className="btn-status btn-status-next"
              onClick={() => handleStatusChange(getNextStatus()!)}
              title={`Move to ${getNextStatus()}`}
            >
              {TASK_STATUSES.find(s => s.value === getNextStatus())?.label} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
