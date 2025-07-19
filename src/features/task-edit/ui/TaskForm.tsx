import {type FormEvent, useState} from "react";
import type {Task} from "@entitites/task/types";
import {formatCreatedAt} from "@shared/utils/dateFormatting";

interface TaskFormProps {
    initialData: Omit<Task, 'id'> & { id?: string };
    onSubmit: (data: Task) => void;
    onCancel: () => void;
    isEditMode?: boolean;
}

export const TaskForm = ({
                             initialData,
                             onSubmit,
                             onCancel,
                             isEditMode = false
                         }: TaskFormProps) => {
    const [formData, setFormData] = useState(initialData);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            id: formData.id || Date.now().toString()
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xs md:max-w-2xl mx-auto">
            <h2 className="text-3xl mb-4 font-ibmmono uppercase mt-4">
                {isEditMode ? "EDIT TASK" : "NEW TASK"}
            </h2>
            <div className="mb-4">
                <label className="block font-ibmmono text-sm mb-1">TITLE</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-black font-ibmmono"
                    required
                />
            </div>
            <div className="mb-4 text-gray-300">
                <label className="block font-ibmmono text-sm mb-1">CREATED AT</label>
                <input
                    name="createdAt"
                    value={formatCreatedAt(formData.createdAt)}
                    className="w-full p-2 border border-gray-300 font-ibmmono"
                    readOnly={true}
                />
            </div>

            <div className="mb-4">
                <label className="block font-ibmmono text-sm mb-1">DESCRIPTION</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-black font-ibmsans min-h-[100px]"
                />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block font-ibmmono text-sm mb-1">PRIORITY</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full p-2 border border-black font-ibmmono text-sm"
                    >
                        {['Low', 'Medium', 'High'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-ibmmono text-sm mb-1">STATUS</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-black font-ibmmono text-sm"
                    >
                        {['To Do', 'In Progress', 'Done'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-ibmmono text-sm mb-1">CATEGORY</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-black font-ibmmono text-sm"
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
                    className="font-ibmmono px-4 py-2 border border-black bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer text-sm uppercase"
                >
                    {isEditMode ? "UPDATE" : "CREATE"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="font-ibmmono px-4 py-2 border border-black hover:bg-gray-100 transition-colors cursor-pointer text-sm uppercase"
                >
                    CANCEL
                </button>
            </div>
        </form>
    );
};