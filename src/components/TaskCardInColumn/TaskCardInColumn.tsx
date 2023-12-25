import "./TaskCardInColumn.css"
import TaskType from "../TaskTypeBadge/TaskTypeBadge";
import { useEffect } from "react";
import { Task } from "../../models/Task";
import convertToReadableDate from "../../helperFunctions/convertToReadableDate";


type TaskCardProps = {
    data: Task;
}

export default function TaskCardInColumn(props: TaskCardProps){
    let element;
    
    function dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData("text/plain", JSON.stringify(props.data));
        console.log(event.dataTransfer!.getData("text/plain"));
        event.dataTransfer!.effectAllowed = "move";
    }

    function dragEndHandler(event: DragEvent): void {
        event.preventDefault();
    }

    useEffect(() => {
        element = document.getElementById(`task-card-${props.data.id}`) as HTMLElement;
        element.addEventListener("dragstart", dragStartHandler);
        element.addEventListener("dragend", dragEndHandler);
    }, [])

    return (
        <div id="task-card-in-column-holder">
            <button id={`task-card-${props.data.id}`} className="task-card-in-column" draggable="true" onClick={() => alert("Hello")}>
                <div id="card-header">
                    <div id="row-holder">
                        <div id="title-holder" className="card-title-text">{props.data.taskTitle}</div>
                        <div id="title-holder"><TaskType type={props.data.type}/></div>
                    </div>
                </div>
                <div id="card-time-display">
                    <div id="row-holder" className="card-time-text">
                        {convertToReadableDate(props.data.taskStartTime)} - {convertToReadableDate(props.data.taskEndTime)}
                    </div>
                </div>
                <div id="card-description-display">
                    <div id="row-holder" className="card-description-text">
                        {props.data.additionalDescription}
                    </div>
                </div>
            </button>
            
        </div>
    )
}