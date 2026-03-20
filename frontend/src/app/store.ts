import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from '../features/tasks/taskApi';
import taskUiReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    taskUi: taskUiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
