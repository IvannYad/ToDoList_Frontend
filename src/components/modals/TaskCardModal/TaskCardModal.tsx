import convertToReadableDate from "../../../helperFunctions/convertToReadableDate";
import { Task } from "../../../models/Task";
import TaskType from "../../ui/TaskTypeBadge/TaskTypeBadge";
import "./TaskCardModal.css"
import { useState } from "react";
import ConfirmDeletingModal from "../ConfirmDeletingModal/ConfirmDeletingModal";
import { Button, Modal } from "antd";
import CreateUpdateTaskFormModal from "../CreateUpdateTaskFormModal/CreateUpdateTaskFormModal";


type TaskCardProps = {
    data: Task;
    isOpen: boolean;
    resetHandler: () => void;
}

export default function TaskCardModal(props: TaskCardProps){
    const [isUpdateFormOpen, setIsUpdateFromOpen] = useState(false);
    const [isDeleteFormOpen, setIsDeleteFromOpen] = useState(false);

    // Function for handling opening and closing from for updating and delete submission message.
    function openUpdateFormHandler(event: React.MouseEvent<HTMLElement, MouseEvent>): void{
        event.preventDefault();
        setIsUpdateFromOpen(true);
    }

    function closeUpdateFormHandler(): void{
        setIsUpdateFromOpen(false);
    }

    function openDeleteFormHandler(event: React.MouseEvent<HTMLElement, MouseEvent>): void{
        event.preventDefault();
        setIsDeleteFromOpen(true);
    }

    function closeDeleteFormHandler(event: React.MouseEvent<HTMLElement, MouseEvent>): void{
        event.preventDefault();
        setIsDeleteFromOpen(false);
    }

    // If task card with full information isn`t invoked return null.
    if(!props.isOpen) return null;

    const task: Task = props.data;

    return (
        <Modal 
            open={props.isOpen}
            centered={true}
            closable={false}
            className="task-card-modal"
            footer={
                [
                    <div className="row-holder">
                        <Button
                        onClick={(event) => openUpdateFormHandler(event)}
                        className="update-button-card button"
                    >Update</Button>
                    <Button
                        onClick={(event) => openDeleteFormHandler(event)}
                        className="delete-button-card button"
                    >Delete</Button>
                    <Button
                        onClick={(event) => {
                            event.preventDefault();
                            props.resetHandler()
                        }}
                        className="cancel-button-card button"
                    >Cancel</Button>
                    </div>,
                    
                ]
            }
            >
                <div className="status-holder">
                    <div className={`status-${props.data.status} task-card-status`}>{task.status}</div>
                </div>
                <div className="card-header">
                    <div className="row-holder">
                        <div id="title-holder" className="card-title-text">{task.taskTitle}</div>
                        <div id="title-holder"><TaskType type={task.type}/></div>
                    </div>
                </div>
                <div className="card-time-display">
                    <div className="row-holder card-time-text">
                        {convertToReadableDate(task.taskStartTime)} - {convertToReadableDate(task.taskEndTime)}
                    </div>
                </div>
                <div className="card-description-display">
                    <div className="row-holder card-description-text">
                        {task.additionalDescription}
                    </div>
                </div>
                <ConfirmDeletingModal id={props.data.id} isOpen={isDeleteFormOpen} closeHandler={closeDeleteFormHandler}/>
                <CreateUpdateTaskFormModal type="update" prevTaskData={props.data} isOpen={isUpdateFormOpen} closeHandler={closeUpdateFormHandler} />
        </Modal>
    )
}