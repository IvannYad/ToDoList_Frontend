import { useContext, useEffect } from "react";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import TaskList from "../TaskList/TaskList";
import "./Column.css"
import { Task } from "../../models/Task";
import { TaskAPIServiceContext } from "../App/App";
import { OnTasksChangeHandlersContext } from "../Main/Main";

type ColumnProps = {
    id: "to-do-column" | "in-progress-column" | "done-column";
    title: string;
    tasks: Task[];
}

export default function Column({id, title, tasks}: ColumnProps){
    const taskAPIService = useContext(TaskAPIServiceContext);
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);
    let element: HTMLElement;

    useEffect(() => {
        element = document.getElementById(id) as HTMLElement;
        element.addEventListener("dragover", dragOverHandler);
        element.addEventListener("dragleave", dragLEaveHandler);
        element.addEventListener("drop", dropHandler);
        return () => {
            element.removeEventListener("dragover", dragOverHandler);
            element.removeEventListener("dragleave", dragLEaveHandler);
            element.removeEventListener("drop", dropHandler);
        }
    }, [])

    useEffect(() => {
        // async function SetTasks() {
        //     console.log("TaskUpdate");
        //     const tasksFromAPI = await taskAPIService.getAll(null);
        //     }
        // }
    })

    function dragOverHandler(event: DragEvent): void {
        event.preventDefault();
        element.classList.add("drag-over");
        element.getElementsByClassName("column-header")[0]
            .classList.add("column-header-drag-over");
    }

    function dropHandler(event: DragEvent): void {
        event.preventDefault();

        const newStatus = id === "to-do-column" ? "to-do" : 
            (id === "in-progress-column" ? "in-progress" : "done");
        const oldTask: Task = JSON.parse(event.dataTransfer!.getData("text/plain"));
        const newTaskData: Task = {
            ... oldTask,
            status: newStatus 
        }
        
        if(newTaskData.id){
            taskAPIService.update(+oldTask.id, newTaskData, tasksChangeHandlers.onUpdateHandler);
        }
        
        element.classList.remove("drag-over");
        const header = element.getElementsByClassName("column-header")[0];
        header.classList.remove("column-header-drag-over");
        header.classList.add("column-header");
    }

    function dragLEaveHandler(event: DragEvent): void {
        event.preventDefault();
        element.classList.remove("drag-over");
        const header = element.getElementsByClassName("column-header")[0];
        header.classList.remove("column-header-drag-over");
        header.classList.add("column-header");
    }
    
    return (
        <div id={id} className="column">
            <div className="column-header">
                {title}
            </div>
            <div>
                <TaskList columnId={id} tasks={tasks}/>
                { id === "to-do-column" ? <AddTaskButton /> : ""}
            </div>
        </div>
    )   
}