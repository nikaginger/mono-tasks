import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/app/App.tsx'
import {TaskProvider} from "./features/task-list/model/TaskContext.tsx";

createRoot(document.getElementById('root')!).render(
    <TaskProvider>
        <StrictMode>
            <App />
        </StrictMode>,
    </TaskProvider>
)
