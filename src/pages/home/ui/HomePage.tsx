import {TaskList} from "@features/task-list/ui/TaskList";
import {useMemo, useState} from "react";
import {TaskFilters} from "@features/task-filters/ui/TaskFilters";
import {useSelector} from "react-redux";
import type {RootState} from "@app/store";
import {Link} from "react-router-dom";

export const HomePage = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
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
            <TaskFilters onFilterChange={setFilters}/>
            <TaskList tasks={filteredTasks}/>
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