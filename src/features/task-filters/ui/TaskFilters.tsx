import type {TaskPriority, TaskStatus, TaskCategory} from "@entitites/task/types";
import {useState} from "react";

export interface TaskFilters {
    status?: TaskStatus;
    priority?: TaskPriority;
    category?: TaskCategory;
}

export const TaskFilters = ({onFilterChange}: { onFilterChange: (filter: TaskFilters) => void }) => {
    const [filters, setFilters] = useState<TaskFilters>({});
    const handleChange = (type: keyof TaskFilters, value?: string) => {
        const newFilters = { ...filters, [type]: value || undefined };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters = {};
        setFilters(resetFilters);
        onFilterChange(resetFilters);
        const selects = document.querySelectorAll('select');
        selects.forEach(select => select.value = '');
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <select
                onChange={(e) => handleChange('status', e.target.value)}
                className="font-ibmmono p-2 border text-sm"
            >
                <option value="">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            <select
                onChange={(e) => handleChange('priority', e.target.value)}
                className="font-ibmmono p-2 border text-sm"
            >
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <select
                onChange={(e) => handleChange('category', e.target.value)}
                className="font-ibmmono p-2 border text-sm"
            >
                <option value="">All Categories</option>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
                <option value="Documentation">Documentation</option>
                <option value="Refactor">Refactor</option>
                <option value="Test">Test</option>
            </select>

            <button
                onClick={handleReset}
                className="uppercase text-sm font-ibmmono bg-black text-white p-2 border border-black cursor-pointer under hover:underline"
            >
                Reset Filters
            </button>
        </div>
    )
}