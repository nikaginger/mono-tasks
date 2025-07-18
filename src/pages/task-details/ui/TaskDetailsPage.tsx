import {useParams} from "react-router-dom";
import {useTasks} from "../../../features/task-list/model/TaskContext.tsx";
import {TaskForm} from "../../../features/task-edit/ui/TaskForm.tsx";


export const TaskDetailsPage = () => {
    const { id } = useParams();
    const { tasks } = useTasks();
    const task = tasks.find((task) => task.id === id);
    if (!task) return <div> Task was not found </div>

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl mb-4 uppercase font-ibmmono"> Editing task</h2>
            <TaskForm task={task} />
        </div>
    )
};