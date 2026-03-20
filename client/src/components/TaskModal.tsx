import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/tasks/taskSlice';
import TaskForm from './TaskForm';

export default function TaskModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.taskUi.isModalOpen);
  const editingTask = useSelector((state: RootState) => state.taskUi.editingTask);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={editingTask ? 'Edit task' : 'Create task'}
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {editingTask ? '✏️ Edit Task' : '✨ New Task'}
          </h2>
          <button
            className="modal-close"
            onClick={() => dispatch(closeModal())}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <TaskForm />
      </div>
    </div>
  );
}
