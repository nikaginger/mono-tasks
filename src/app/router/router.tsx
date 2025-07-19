import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "@/pages/home/ui/HomePage"
import {TaskDetailsPage} from '@/pages/task-details/ui/TaskDetailsPage'
import {TaskNewPage} from "@/pages/task-new/ui/TaskNewPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/tasks/:id",
        element: <TaskDetailsPage/>,
    },
    {
        path: '/task/new',
        element: <TaskNewPage />
    },
]);