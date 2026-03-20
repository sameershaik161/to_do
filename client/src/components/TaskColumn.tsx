import TaskCard from './TaskCard';
import type { Task } from '../types/task';

interface TaskColumnProps {
  label: string;
  tasks: Task[];
  accentColor: string;
}

export default function TaskColumn({ label, tasks, accentColor }: TaskColumnProps) {
  return (
    <div className="task-column">
      <div className="column-header" style={{ borderTopColor: accentColor }}>
        <div className="column-header-left">
          <span className="column-dot" style={{ backgroundColor: accentColor }} />
          <h2 className="column-title">{label}</h2>
        </div>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="column-tasks">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <span>No tasks here</span>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}
