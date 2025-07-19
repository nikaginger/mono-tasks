import { TaskItem } from "./TaskItem";
import type { Task } from "@entitites/task/types";
import { memo } from "react";
import {useDispatch} from "react-redux";
import {deleteTask} from "@features/task-list/model/tasksSlice";

interface TaskListProps {
    tasks: Task[];
}

export const TaskList = memo(({ tasks }: TaskListProps) => {
    const dispatch = useDispatch()

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(id))
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {tasks.map((task) => (
                <TaskItem key={`${task.id}-${task.status}-${task.priority}-${task.category}`} task={task} onDelete={handleDelete}/>
            ))}
        </div>
    );
});