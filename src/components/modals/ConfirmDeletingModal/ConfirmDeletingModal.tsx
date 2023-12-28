import { useContext } from "react";
import { OnTasksChangeHandlersContext } from "../../Main/Main";
import { TaskAPIServiceContext } from "../../App/App";
import "./ConfirmDeletingModal.css"
import { Modal } from "antd";

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
            onCancel={(event) => props.closeHandler(event)}
            onOk={(event) => onDeleteSubmitHandler(event)}
            okButtonProps={{ 
                className: "confirm-delete-task-button button",
            }}
            okText="Delete"
            cancelButtonProps={{ 
                className: "cancel-delete-task-button button",
            }}
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