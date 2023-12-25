import ReactDOM from "react-dom";
import convertToReadableDate from "../../helperFunctions/convertToReadableDate";
import { Task } from "../../models/Task";
import TaskType from "../TaskTypeBadge/TaskTypeBadge";
import "./TaskCard.css"

type TaskCardProps = {
    data: Task;
    hostElement: HTMLElement;
    isOpen: boolean;
}

export default function TaskCard(props: TaskCardProps){
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
                        <button className="button updateButton">Update</button>
                        <button className="button deleteButton">Delete</button>
                        <button className="button backToListButton">Back to list</button>
                    </div>
                </div>
            </div>
        </div>
    , props.hostElement)
    
}