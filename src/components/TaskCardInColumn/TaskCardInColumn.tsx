import "./TaskCardInColumn.css"
import TaskType from "../TaskTypeBadge/TaskTypeBadge";
import { useEffect, useState } from "react";
import { Task } from "../../models/Task";
import convertToReadableDate from "../../helperFunctions/convertToReadableDate";
import TaskCard from "../TaskCard/TaskCard";



type TaskCardPropsInColumn = {
    data: Task;
}

type TaskCardProps = {
    data: Task;
    hostElement: HTMLElement;
    resetHandler: () => void;
}

export default function TaskCardInColumn(props: TaskCardPropsInColumn){
    const [isOpen, setIsOpen] = useState(false);
    let element;
    
    // Function for handling drag-and-drop.
    function dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData("text/plain", JSON.stringify(props.data));
        console.log(event.dataTransfer!.getData("text/plain"));
        event.dataTransfer!.effectAllowed = "move";
    }

    function dragEndHandler(event: DragEvent): void {
        event.preventDefault();
    }

    // Frunction-handler click on task card in column, opens task card wuth full information
    // and sets blurry background.
    function clickHandler(): void{
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.add("blurry-rectangle");
        
        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.add("disable-scrolling");
        setIsOpen(true);
    }

    // Function-handler of 'Cancel' click on task card with full information.
    function resetClick(): void{
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.remove("blurry-rectangle");

        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.remove("disable-scrolling");
        setIsOpen(false);
    }

    useEffect(() => {
        element = document.getElementById(`task-card-${props.data.id}`) as HTMLElement;
        element.addEventListener("dragstart", dragStartHandler);
        element.addEventListener("dragend", dragEndHandler);
    }, [])

    // Data passed to cardwith full information.
    const taskCardProps:TaskCardProps = {
        data: props.data,
        hostElement: document.getElementById("additional-elements-holder") as HTMLElement,
        resetHandler: resetClick
    }

    return (
        <div id="task-card-in-column-holder">
            <button id={`task-card-${props.data.id}`} className="task-card-in-column" draggable="true" onClick={clickHandler}>
                <div id="card-header">
                    <div id="row-holder">
                        <div id="title-holder" className="card-title-text text-overflow-hidden">{props.data.taskTitle}</div>
                        <div id="title-holder"><TaskType type={props.data.type}/></div>
                    </div>
                </div>
                <div id="card-time-display">
                    <div id="row-holder" className="card-time-text">
                        {convertToReadableDate(props.data.taskStartTime)} - {convertToReadableDate(props.data.taskStartTime)}
                    </div>
                </div>
                <div id="card-description-display">
                    <div id="row-holder" className="card-description-text text-overflow-hidden">
                        {props.data.additionalDescription}
                    </div>
                </div>
            </button>
            <TaskCard data={taskCardProps.data} hostElement={taskCardProps.hostElement} isOpen={isOpen} resetHandler={taskCardProps.resetHandler}/>
        </div>
    )
}