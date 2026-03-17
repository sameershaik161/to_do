import type { Request, Response } from 'express';
import Task from '../models/task.model';
import type { CreateTaskDto, UpdateTaskDto } from '../types/task.types';

// GET /api/tasks
export const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// POST /api/tasks
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as CreateTaskDto;
    const task = await Task.create(body);
    res.status(201).json({ success: true, data: task });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params['id']);
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as UpdateTaskDto;
    const task = await Task.findByIdAndUpdate(
      req.params['id'],
      { $set: body },
      { new: true, runValidators: true }
    );
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }
    res.json({ success: true, data: task });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params['id']);
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
