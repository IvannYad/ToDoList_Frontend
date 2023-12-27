import ReactDOM from "react-dom";
import convertToReadableDate from "../../helperFunctions/convertToReadableDate";
import { Task } from "../../models/Task";
import TaskType from "../TaskTypeBadge/TaskTypeBadge";
import "./TaskCard.css"
import TaskForm from "../TaskForm/TaskForm";
import { useState } from "react";


type TaskCardProps = {
    data: Task;
    hostElement: HTMLElement;
    isOpen: boolean;
    resetHandler: () => void;
}

export default function TaskCard(props: TaskCardProps){
    const hostElement = document.getElementById("additional-elements-holder") as HTMLElement;
    const [isOpen, setIsOpen] = useState(false);

    function openHandler(): void{
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.add("blurry-rectangle");
        
        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.add("disable-scrolling");
        setIsOpen(true);
    }

    function closeHandler(): void{
        setIsOpen(false);
    }

    if(!props.isOpen) return null;
    const task: Task = props.data;
    return ReactDOM.createPortal(
        <div className="task-card" draggable="true">
            <div id="status-holder">
                <div id="status">{task.status}</div>
            </div>
            <div id="card-header">
                <div id="row-holder">
                    <div id="title-holder" className="card-title-text">{task.taskTitle}</div>
                    <div id="title-holder"><TaskType type={task.type}/></div>
                </div>
            </div>
            <div id="card-time-display">
                <div id="row-holder" className="card-time-text">
                    {convertToReadableDate(task.taskStartTime)} - {convertToReadableDate(task.taskEndTime)}
                </div>
            </div>
            <div id="card-description-display">
                <div id="row-holder" className="card-description-text">
                    {task.additionalDescription}
                </div>
            </div>
            <div id="card-buttons-display">
                <div id="row-holder" className="card-description-text">
                    <div>
                        <button className="button updateButton" onClick={() => openHandler()}>Update</button>
                        <button className="button deleteButton">Delete</button>
                        <button className="button backToListButton" onClick={() => props.resetHandler()}>Back to list</button>
                    </div>
                </div>
            </div>
            <TaskForm type="update" hostElement={hostElement} isOpen={isOpen} closeHandler={closeHandler} prevTaskData={props.data}/>
        </div>
    , props.hostElement)
    
}