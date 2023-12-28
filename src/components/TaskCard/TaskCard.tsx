import ReactDOM from "react-dom";
import convertToReadableDate from "../../helperFunctions/convertToReadableDate";
import { Task } from "../../models/Task";
import TaskType from "../ui/TaskTypeBadge/TaskTypeBadge";
import "./TaskCard.css"
import TaskForm from "../TaskForm/TaskForm";
import { useState } from "react";
import DeleteSubmittionMessage from "../DeleteSubmittionMessage/DeleteSubmittionMessage";
import Button from "../ui/Button/Button";


type TaskCardProps = {
    data: Task;
    hostElement: HTMLElement;
    isOpen: boolean;
    resetHandler: () => void;
}

export default function TaskCard(props: TaskCardProps){
    const hostElement = document.getElementById("additional-elements-holder") as HTMLElement;
    const [isUpdateFormOpen, setIsUpdateFromOpen] = useState(false);
    const [isDeleteFormOpen, setIsDeleteFromOpen] = useState(false);

    // Function for handling opening and closing from for updating and delete submission message.
    function openUpdateFormHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void{
        event.preventDefault();
        (document.getElementById("task-card") as HTMLElement).style.display = "none";
        setIsUpdateFromOpen(true);
    }

    function closeUpdateFormHandler(): void{
        (document.getElementById("task-card") as HTMLElement).style.display = "block";
        setIsUpdateFromOpen(false);
    }

    function openDeleteFormHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void{
        event.preventDefault();
        (document.getElementById("task-card") as HTMLElement).style.display = "none";
        setIsDeleteFromOpen(true);
    }

    function closeDeleteFormHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void{
        event.preventDefault();
        (document.getElementById("task-card") as HTMLElement).style.display = "block";
        setIsDeleteFromOpen(false);
    }

    // If task card with full information isn`r invoked return null.
    if(!props.isOpen) return null;

    const task: Task = props.data;

    return ReactDOM.createPortal(
        <div id="task-card" draggable="true">
            <div id="status-holder">
                <div id={`status-${props.data.status}`} className="task-card-status">{task.status}</div>
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
                <div id="row-holder">
                    <div>
                        <Button type="click" buttonClasses="button update-button-card" onClickHandler={(event) => openUpdateFormHandler(event)}>Update</Button>
                        <button className="button delete-button-card" onClick={(event) => openDeleteFormHandler(event)}>Delete</button>
                        <button className="button cancel-button-card" onClick={() => props.resetHandler()}>Back to list</button>
                    </div>
                </div>
            </div>
            <TaskForm type="update" hostElement={hostElement} isOpen={isUpdateFormOpen} closeHandler={closeUpdateFormHandler} prevTaskData={props.data}/>
            <DeleteSubmittionMessage id={props.data.id} hostElement={hostElement} isOpen={isDeleteFormOpen} closeHandler={closeDeleteFormHandler}/>
        </div>
    , props.hostElement)
}