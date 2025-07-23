import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "@features/task-edit/ui/TaskForm";
import { updateTaskApi, fetchTaskById } from "@/shared/api/taskApi";
import type { Task } from "@entitites/task/types";

export const TaskDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const loadTask = async () => {
            try {
                const data = await fetchTaskById(id);
                setTask(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки задачи');
            } finally {
                setLoading(false);
            }
        };
        loadTask();
    }, [id]);

    const handleSubmit = async (updatedTask: Task) => {
        if (!id) return;

        try {
            const { id: taskId, ...updates } = updatedTask;
            await updateTaskApi(taskId, updates);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка обновления задачи');
        }
    };

    if (loading) return <div>Загрузка задачи...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!task) return <div>Задача не найдена</div>;

    return (
        <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
            isEditMode
        />
    );
};