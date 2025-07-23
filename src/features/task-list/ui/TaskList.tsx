import { TaskItem } from "./TaskItem";
import type { Task } from "@entitites/task/types";
import { memo } from "react";

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void; // Принимаем обработчик через пропсы
}

export const TaskList = memo(({ tasks, onDelete }: TaskListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {tasks.map((task) => (
                <TaskItem
                    key={`${task.id}-${task.status}-${task.priority}-${task.category}`}
                    task={task}
                    onDelete={() => onDelete(task.id)} // Передаем обработчик дальше
                />
            ))}
        </div>
    );
});