import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { closeModal } from '../features/tasks/taskSlice';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../features/tasks/taskApi';
import type { CreateTaskDto, TaskPriority, TaskStatus } from '../types/task';
import { TASK_PRIORITIES, TASK_STATUSES } from '../types/task';

interface FormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export default function TaskForm() {
  const dispatch = useDispatch();
  const editingTask = useSelector((state: RootState) => state.taskUi.editingTask);
  const isEditing = Boolean(editingTask);

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const isLoading = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'todo',
      dueDate: '',
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        status: editingTask.status,
        dueDate: editingTask.dueDate
          ? editingTask.dueDate.split('T')[0] ?? ''
          : '',
      });
    } else {
      reset({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'todo',
        dueDate: '',
      });
    }
  }, [editingTask, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && editingTask) {
        await updateTask({ id: editingTask._id, data: values }).unwrap();
      } else {
        const dto: CreateTaskDto = values;
        await createTask(dto).unwrap();
      }
      dispatch(closeModal());
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Title */}
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title <span className="required">*</span>
        </label>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required', maxLength: { value: 100, message: 'Max 100 chars' } }}
          render={({ field }) => (
            <input
              {...field}
              id="title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="What needs to be done?"
            />
          )}
        />
        {errors.title && <p className="error-msg">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="description"
              className="form-input form-textarea"
              placeholder="Add more details..."
              rows={3}
            />
          )}
        />
      </div>

      {/* Priority + Status Row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Priority <span className="required">*</span>
          </label>
          <Controller
            name="priority"
            control={control}
            rules={{ required: 'Priority is required' }}
            render={({ field }) => (
              <select
                {...field}
                id="priority"
                className={`form-input form-select ${errors.priority ? 'input-error' : ''}`}
              >
                {TASK_PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            )}
          />
          {errors.priority && <p className="error-msg">{errors.priority.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select {...field} id="status" className="form-input form-select">
                {TASK_STATUSES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      {/* Due Date */}
      <div className="form-group">
        <label htmlFor="dueDate" className="form-label">
          Due Date <span className="required">*</span>
        </label>
        <Controller
          name="dueDate"
          control={control}
          rules={{ required: 'Due date is required' }}
          render={({ field }) => (
            <input
              {...field}
              id="dueDate"
              type="date"
              className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
            />
          )}
        />
        {errors.dueDate && <p className="error-msg">{errors.dueDate.message}</p>}
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch(closeModal())}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving…' : isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
