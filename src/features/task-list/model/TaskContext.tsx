import {createContext, type ReactNode, useContext, useState} from 'react';
import type {Task} from "../../../entitites/task/types"

type TaskContextType = {
    tasks: Task[];
    updateTask: (id: string, updates: Partial<Task>) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([
        {id: "1", title: "Fix Bug", priority: "High", category: "Bug", status: "To Do"},
        {id: "2", title: "Add Button on the Main Page", description: "Blah blah blah", priority: "Low", category: "Feature", status: "In Progress"},
        {id: "2", title: "Add Something Else", description: "Blah blah blah", priority: "Medium", category: "Feature", status: "In Progress"}
    ]);

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, ...updates } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('Use useTasks only within a TaskProvider');
    return context;
}