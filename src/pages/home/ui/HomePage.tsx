import { TaskList } from "../../../features/task-list/ui/TaskList.tsx";
import {useMemo, useState} from "react";
import { useTasks } from "../../../features/task-list/model/TaskContext.tsx";
import { TaskFilters } from "../../../features/task-filters/ui/TaskFilters.tsx";

export const HomePage = () => {
    const { tasks } = useTasks();
    const [filters, setFilters] = useState<TaskFilters>({});

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const statusMatch = !filters.status || task.status === filters.status;
            const priorityMatch = !filters.priority || task.priority === filters.priority;
            const categoryMatch = !filters.category || task.category === filters.category;
            return statusMatch && priorityMatch && categoryMatch;
        });
    }, [tasks, filters]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4 font-ibmmono uppercase">Tasks</h1>
            <TaskFilters onFilterChange={setFilters} />
            <TaskList tasks={filteredTasks} />
        </div>
    );
};