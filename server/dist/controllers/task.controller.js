"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.createTask = exports.getAllTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
// GET /api/tasks
const getAllTasks = async (_req, res) => {
    try {
        const tasks = await task_model_1.default.find().sort({ createdAt: -1 });
        res.json({ success: true, data: tasks });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.getAllTasks = getAllTasks;
// POST /api/tasks
const createTask = async (req, res) => {
    try {
        const body = req.body;
        const task = await task_model_1.default.create(body);
        res.status(201).json({ success: true, data: task });
    }
    catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({ success: false, message: error.message });
        }
        else {
            res.status(500).json({ success: false, message: 'Server error', error });
        }
    }
};
exports.createTask = createTask;
// GET /api/tasks/:id
const getTaskById = async (req, res) => {
    try {
        const task = await task_model_1.default.findById(req.params['id']);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.getTaskById = getTaskById;
// PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const body = req.body;
        const task = await task_model_1.default.findByIdAndUpdate(req.params['id'], { $set: body }, { new: true, runValidators: true });
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.json({ success: true, data: task });
    }
    catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({ success: false, message: error.message });
        }
        else {
            res.status(500).json({ success: false, message: 'Server error', error });
        }
    }
};
exports.updateTask = updateTask;
// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const task = await task_model_1.default.findByIdAndDelete(req.params['id']);
        if (!task) {
            res.status(404).json({ success: false, message: 'Task not found' });
            return;
        }
        res.json({ success: true, message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.deleteTask = deleteTask;
