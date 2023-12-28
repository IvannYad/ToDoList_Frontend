import { useContext, useEffect } from "react";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import TaskList from "../TaskList/TaskList";
import "./Column.css"
import { Task } from "../../models/Task";
import { TaskAPIServiceContext } from "../App/App";
import { OnTasksChangeHandlersContext } from "../Main/Main";
import CardHeader from "../ui/CardHeader/CardHeader";

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

    // Handler of dran-and-drop.
    function dragOverHandler(event: DragEvent): void {
        // Add dragging effeects.
        event.preventDefault();
        element.classList.add("drag-over");
        element.getElementsByClassName("column-header")[0]
            .classList.add("column-header-drag-over");
    }

    function dropHandler(event: DragEvent): void {
        event.preventDefault();

        // Setting new tasks status regarding column id, where tasks is dropped. 
        const newStatus = id === "to-do-column" ? "to-do" : 
            (id === "in-progress-column" ? "in-progress" : "done");
        
        // Getting task, that is dragged, from event data.
        const oldTask: Task = JSON.parse(event.dataTransfer!.getData("text/plain"));
        
        // Assigning to retieved task new status.
        const newTaskData: Task = {
            ... oldTask,
            status: newStatus 
        }
        
        if(newTaskData.id){
            // If id is provided, update task
            taskAPIService.update(+oldTask.id, newTaskData, tasksChangeHandlers.onUpdateNotifyHandler);
        }
        
        // Remove dragging effects
        element.classList.remove("drag-over");
        const header = element.getElementsByClassName("column-header")[0];
        header.classList.remove("column-header-drag-over");
        header.classList.add("column-header");
    }

    function dragLEaveHandler(event: DragEvent): void {
        event.preventDefault();
        // Remove dragging effects.
        element.classList.remove("drag-over");
        const header = element.getElementsByClassName("column-header")[0];
        header.classList.remove("column-header-drag-over");
        header.classList.add("column-header");
    }
    
    return (
        <div id={id} className="column">
            <CardHeader headerClasses={`${id}-header header column-header`}>{title}</CardHeader>
            <div>
                <TaskList columnId={id} tasks={tasks}/>
                { id === "to-do-column" ? <AddTaskButton /> : ""}
            </div>
        </div>
    )   
}