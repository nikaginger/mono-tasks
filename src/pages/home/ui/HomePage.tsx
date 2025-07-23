import { TaskList } from "@features/task-list/ui/TaskList";
import { useState, useEffect, useMemo } from "react";
import { fetchTasksApi, deleteTaskApi } from "@/shared/api/taskApi";
import { TaskFilters } from "@features/task-filters/ui/TaskFilters";
import { Link } from "react-router-dom";
import type { Task } from "@entitites/task/types";

export const HomePage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filters, setFilters] = useState<TaskFilters>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchTasksApi();
                setTasks(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Ошибка загрузки");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTaskApi(id);
            // Обновляем состояние, удаляя задачу из списка
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка удаления");
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const statusMatch = !filters.status || task.status === filters.status;
            const priorityMatch = !filters.priority || task.priority === filters.priority;
            const categoryMatch = !filters.category || task.category === filters.category;
            return statusMatch && priorityMatch && categoryMatch;
        });
    }, [tasks, filters]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4 font-ibmmono uppercase">Tasks</h1>
            <TaskFilters onFilterChange={setFilters} />

            {/* Передаем задачи и обработчик удаления */}
            <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
            />

            <div className="mt-auto pt-3">
                <Link
                    to={`/task/new`}
                    className="font-ibmmono text-sm bg-black text-white py-2 px-4 underline-offset-4 hover:underline"
                >
                    + NEW TASK
                </Link>
            </div>
        </div>
    );
};