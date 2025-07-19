import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@entitites/task/types';
import {storage} from "@shared/lib/storage";

const STORAGE_KEY = 'mono-tasks-app';

const initialState: Task[] = storage.get(STORAGE_KEY) || [];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        /**
         * Обновляет задачу по ID.
         * @param {Task[]} state - Текущий список задач.
         * @param {PayloadAction<{ id: string; updates: Partial<Task> }>} action - Объект с ID и обновляемыми полями.
         * @example
         * dispatch(updateTask({ id: '123', updates: { status: 'Done' } }));
         */
        updateTask: (state: Task[], action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
            const { id, updates } = action.payload;
            const task = state.find(task => task.id === id);
            if (task) Object.assign(task, updates);
        },
        /**
         * Добавляет новую задачу.
         * @param {Task[]} state - Текущий список задач.
         * @param {PayloadAction<Task>} action - Новая задача.
         */
        addTask: (state: Task[], action: PayloadAction<Task>) => {
            if (!action.payload.title.trim()) return state;
            state.push(action.payload);
        },
        /**
         * Удаляет задачу по ID.
         * @param {Task[]} state - Текущий список задач.
         * @param {PayloadAction<string>} action - ID задачи.
         */
        deleteTask
            : (state: Task[], action: PayloadAction<string>) => {
            return state.filter(task => task.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.startsWith('tasks/'),
            (state) => {
                storage.set(STORAGE_KEY, state);
            }
        );
    }
});

export const { updateTask, addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;