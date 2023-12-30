import { useContext } from "react";
import { OnTasksChangeHandlersContext } from "../../Main/Main";
import { TaskAPIServiceContext } from "../../App/App";
import "./ConfirmDeletingModal.css"
import { Button, Modal } from "antd";

type DeleteSubmittionMessageProps = {
    isOpen: boolean;
    closeHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    id: number;
}

export default function ConfirmDeletingModal(props: DeleteSubmittionMessageProps){
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);
    const apiService = useContext(TaskAPIServiceContext);

    // Handler of delete submission.
    function onDeleteSubmitHandler(event: React.MouseEvent<HTMLElement, MouseEvent>){
        event.preventDefault();
        apiService.remove(props.id, tasksChangeHandlers.onDeleteNotifyHandler);
    }

    // If delete submission message is not invoked, return null.
    if(!props.isOpen) return null;
    return (
        <Modal
            className="delete-submission-modal"
            open={props.isOpen}
            centered={true}
            footer={
                [
                    <Button
                        onClick={(event) => onDeleteSubmitHandler(event)}
                        className="confirm-delete-task-button button"
                    >Delete</Button>,
                    <Button
                        onClick={(event) => props.closeHandler(event)}
                        className="cancel-delete-task-button button"
                    >Cancel</Button>
                ]
            }
            cancelText="Cancel"
            >
                <div className="content-holder">
                    <div className="circle red-circle">
                        <div className="circle black-circle">
                            <p>!</p>
                        </div>
                    </div>
                    <div className="delete-text-holder">
                        Are you sure?
                    </div>
                </div>
        </Modal>
    )
}