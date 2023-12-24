import "./TaskCard.css"
import { TaskData } from "../TaskList/TaskList";
import TaskType from "../TaskTypeBadge/TaskTypeBadge";
import { useEffect } from "react";


type TaskCardProps = {
    data: TaskData;

}

export default function TaskList(props: TaskCardProps){
    let element;
    
    function dragStartHandler(event: DragEvent): void {
        //event.dataTransfer!.setData("text/plain", this.project.id);
        event.dataTransfer!.effectAllowed = "move";
    }

    function dragEndHandler(event: DragEvent): void {
        console.log(event);
    }

    useEffect(() => {
        element = document.getElementById(`task-card-${props.data.id}`) as HTMLElement;
        element.addEventListener("dragstart", dragStartHandler);
        element.addEventListener("dragend", dragEndHandler);
    }, [])

    return (
        <div id="task-card-holder">
            <div id={`task-card-${props.data.id}`} className="task-card" draggable="true">
                <div id="card-header">
                    <div id="row-holder">
                        <div id="title-holder" className="card-title-text">{props.data.title}</div>
                        <div id="title-holder"><TaskType type={props.data.type}/></div>
                    </div>
                </div>
                <div id="card-time-display">
                    <div id="row-holder" className="card-time-text">
                        {props.data.startDate} - {props.data.endDate}
                    </div>
                </div>
                <div id="card-description-display">
                    <div id="row-holder" className="card-description-text">
                        {props.data.description}
                    </div>
                </div>
            </div>
            
        </div>
    )
}