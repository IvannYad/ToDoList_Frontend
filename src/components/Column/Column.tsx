import { useEffect } from "react";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import TaskList, { TaskData } from "../TaskList/TaskList";
import "./Column.css"
import { getDummyTasks } from "../../helperFunctions/GetDummyTasks"

type ColumnProps = {
    id: "to-do-column" | "in-progress-column" | "done-column";
    title: string;
}

export default function Column({id, title}: ColumnProps){
    let element: HTMLElement;
    function dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain"){
            event.preventDefault();
            element.classList.add("drag-over");
        }
        
    }
    // function dropHandler(event: DragEvent): void {
    //     const projId = event.dataTransfer!.getData("text/plain");
    //     projectState.moveProject(projId, this.type === "active" ? 
    //     Models.ProjectStatus.Active : Models.ProjectStatus.Finished);
    //     this.element.querySelector("ul")!.classList.remove("droppable");
    // }

    // function dragLEaveHandler(_: DragEvent): void {
    //     const listEl = element.querySelector("ul")!;
    //     listEl.classList.remove("droppable");
    // }
    useEffect(() => {
        element = document.getElementById(id) as HTMLElement;
        console.log(element);
        element.addEventListener("dragover", dragOverHandler);
        // element.addEventListener("dragleave", dragLEaveHandler);
        // element.addEventListener("drop", dropHandler);
    }, [])

    const tasks: TaskData[] = getDummyTasks();

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