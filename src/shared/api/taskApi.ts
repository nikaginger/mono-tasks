import { Task } from "@entitites/task/types";

const API_URL = import.meta.env.VITE_API_URL + '/tasks';

export const fetchTasksApi = async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Ошибка загрузки задач");
    return response.json();
};

export const fetchTaskById = async (taskId: string): Promise<Task> => {
    const response = await fetch(API_URL + "/" + taskId);
    if (!response.ok) {
        throw new Error("Ошибка получения задачи");
    }
    return response.json();
}

export const createTaskApi = async (
    task: Omit<Task, "id" | "createdAt">
): Promise<Task> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Ошибка создания задачи");
    return response.json();
};

export const updateTaskApi = async (
    id: string,
    updates: Partial<Task>
): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Ошибка обновления задачи");
    return response.json();
};

export const deleteTaskApi = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Ошибка удаления задачи");
};