import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "@features/task-edit/ui/TaskForm";
import { addTask } from "@features/task-list/model/tasksSlice";

export const TaskNewPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <TaskForm
            initialData={{
                title: "",
                description: "",
                priority: "Medium",
                status: "To Do",
                category: "Feature",
                createdAt: new Date().toISOString()
            }}
            onSubmit={(newTask) => {
                dispatch(addTask(newTask));
                navigate('/');
            }}
            onCancel={() => navigate('/')}
        />
    );
};