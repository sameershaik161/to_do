import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskPriority } from '../../types/task';

interface TaskUiState {
  isModalOpen: boolean;
  editingTask: Task | null;
  priorityFilter: TaskPriority | 'All';
}

const initialState: TaskUiState = {
  isModalOpen: false,
  editingTask: null,
  priorityFilter: 'All',
};

const taskSlice = createSlice({
  name: 'taskUi',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isModalOpen = true;
      state.editingTask = null;
    },
    openEditModal: (state, action: PayloadAction<Task>) => {
      state.isModalOpen = true;
      state.editingTask = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingTask = null;
    },
    setPriorityFilter: (state, action: PayloadAction<TaskPriority | 'All'>) => {
      state.priorityFilter = action.payload;
    },
  },
});

export const { openCreateModal, openEditModal, closeModal, setPriorityFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
