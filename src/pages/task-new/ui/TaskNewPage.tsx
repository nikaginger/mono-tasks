import { useNavigate } from "react-router-dom";
import { TaskForm } from "@features/task-edit/ui/TaskForm";
import { createTaskApi } from "@/shared/api/taskApi";
import type { Task } from "@entitites/task/types";
import {useState} from "react";

export const TaskNewPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (newTask: Omit<Task, 'id'>) => {
        try {
            await createTaskApi(newTask);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка создания задачи");
        }
    };

    return (
        <div className="container mx-auto p-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <TaskForm
                initialData={{
                    title: "",
                    description: "",
                    priority: "Medium",
                    status: "To Do",
                    category: "Feature",
                    createdAt: new Date().toISOString()
                }}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/')}
            />
        </div>
    );
};