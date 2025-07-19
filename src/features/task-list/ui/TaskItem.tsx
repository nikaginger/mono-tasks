import type {Task} from '@entitites/task/types'
import {Link} from 'react-router-dom'
import { formatCreatedAt } from '@shared/utils/dateFormatting';

interface TaskItemProps {
    task: Task;
    onDelete?: (id: string) => void;
}

export const TaskItem = ({task, onDelete}: TaskItemProps ) => {
    return (
        <div className="p-4 mb-2 border h-full flex flex-col">
            <div className="mb-2">
                <span className="font-sans text-sm text-gray-500 me-2">{task.category}</span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5">
                    {task.priority}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5">
                    {task.status}
                </span>
            </div>

            <h3 className="font-ibmmono font-medium text-xl cursor-pointer mt-2 truncate">
                {task.title}
            </h3>

            {task.createdAt && (
                <p className="font-ibmsans text-gray-300 text-xs">
                    Created on {formatCreatedAt(task.createdAt)}
                </p>
            )}

            {task.description && (
                <p className="font-ibmsans text-gray-500 my-4 line-clamp-3">
                    {task.description}
                </p>
            )}



            <div className="flex flex-wrap mt-auto pt-3">
                <div className="mt-auto pt-3 mr-auto">
                    <Link
                        to={`/tasks/${task.id}`}
                        className="inline-block font-ibmmono text-sm border-b border-black hover:border-transparent"
                    >
                        EDIT
                    </Link>
                </div>
                <button
                    onClick={() => onDelete?.(task.id)}
                    className="mt-auto pt-3 text-gray-500  uppercase inline-block font-ibmmono text-sm hover:text-red-600 cursor-pointer">
                    delete
                </button>
            </div>
        </div>
    )
}