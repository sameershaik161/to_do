import mongoose, { Schema, Document } from 'mongoose';
import type { TaskStatus, TaskPriority } from '../types/task.types';

export interface ITask extends Document {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    dueDate: {
      type: String,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ITask>('Task', TaskSchema);
