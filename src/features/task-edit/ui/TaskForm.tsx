import type { Task } from "../../../entitites/task/types.ts"
import { useTasks } from "../../task-list/model/TaskContext.tsx"
import { type FormEvent, useState } from "react"
import {Link, useNavigate} from "react-router-dom";

interface TaskFormProps {
    task: Task
}

export const TaskForm = ({ task }: TaskFormProps) => {
    const { updateTask } = useTasks()
    const [formData, setFormData] = useState<Task>(task)
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateTask(task.id, formData);
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block font-mono text-sm mb-1">TITLE</label>
                <input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 border font-mono"
                />
            </div>

            <div className="mb-4">
                <label className="block font-mono text-sm mb-1">DESCRIPTION</label>
                <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border font-sans min-h-[100px]"
                />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block font-mono text-sm mb-1">PRIORITY</label>
                    <select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value as Task['priority']})}
                        className="w-full p-2 border font-mono text-sm"
                    >
                        {['Low', 'Medium', 'High'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-mono text-sm mb-1">STATUS</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as Task['status']})}
                        className="w-full p-2 border font-mono text-sm"
                    >
                        {['To Do', 'In Progress', 'Done'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-mono text-sm mb-1">CATEGORY</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as Task['category']})}
                        className="w-full p-2 border font-mono text-sm"
                    >
                        {['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="font-mono px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                    SAVE
                </button>
                <Link
                    to="/"
                    className="font-mono px-4 py-2 border border-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    CANCEL
                </Link>
            </div>
        </form>
    )
}