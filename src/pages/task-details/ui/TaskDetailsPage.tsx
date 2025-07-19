import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "@features/task-edit/ui/TaskForm";
import { updateTask } from "@features/task-list/model/tasksSlice";
import type { RootState } from "@app/store";

export const TaskDetailsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const task = useSelector((state: RootState) =>
        state.tasks.find(t => t.id === id)
    );
    if (!task) return <div>Task not found</div>;
    return (
        <TaskForm
            initialData={task}
            onSubmit={(updatedTask) => {
                dispatch(updateTask({
                    id: updatedTask.id,
                    updates: updatedTask
                }));
                navigate('/');
            }}
            onCancel={() => navigate('/')}
            isEditMode
        />
    );
};