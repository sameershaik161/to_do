export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface ITaskDocument {
  _id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: TaskPriority;
  status?: TaskStatus;
  dueDate: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
}
