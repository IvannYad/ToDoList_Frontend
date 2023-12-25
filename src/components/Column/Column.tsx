import { useContext, useEffect, useState } from "react";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import TaskList from "../TaskList/TaskList";
import "./Column.css"
import { getDummyTasks } from "../../helperFunctions/GetDummyTasks"
import { Task } from "../../models/Task";
import { TaskAPIServiceContext } from "../App/App";

type ColumnProps = {
    id: "to-do-column" | "in-progress-column" | "done-column";
    title: string;
}

export default function Column({id, title}: ColumnProps){
    const [tasks, setTasks] = useState<Task[]>([]);
    const taskAPIService = useContext(TaskAPIServiceContext);
    let element: HTMLElement;
    function dragOverHandler(event: DragEvent): void {
            event.preventDefault();
            element.classList.add("drag-over");
            element.getElementsByClassName("column-header")[0]
                .classList.add("column-header-drag-over");
    }
    function dropHandler(event: DragEvent): void {
        event.preventDefault();
        element.classList.remove("drag-over");
        const header = element.getElementsByClassName("column-header")[0];
        header.classList.remove("column-header-drag-over");
        header.classList.add("column-header");
    }

    function dragLEaveHandler(event: DragEvent): void {
        event.preventDefault();

        const newStatus = id === "to-do-column" ? "to-do" : 
            (id === "in-progress-column" ? "in-progress" : "done");
        const taskId = event.dataTransfer!.getData("text/plain");
        const task: Task = getDummyTasks()
            .filter(task => task.id === +taskId)[0];
        const newTaskData: Task = {
            ... task,
            status: newStatus 
        }
        console.log(newTaskData); 
        //taskAPIService.update(+taskId, newTaskData);

        element.classList.remove("drag-over");
        const header = element.getElementsByClassName("column-header")[0];
        header.classList.remove("column-header-drag-over");
        header.classList.add("column-header");
    }
    
    useEffect(() => {
        taskAPIService.getAll(null)
            .then(data => {
                if(data)
                    setTasks(data);
        })
        element = document.getElementById(id) as HTMLElement;
        console.log(element);
        element.addEventListener("dragover", dragOverHandler);
        element.addEventListener("dragleave", dragLEaveHandler);
        element.addEventListener("drop", dropHandler);
    }, [])

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