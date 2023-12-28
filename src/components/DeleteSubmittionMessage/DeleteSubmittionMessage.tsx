import ReactDOM from "react-dom";
import "./DeleteSubmittionMessage.css"
import { useContext } from "react";
import { TaskAPIServiceContext } from "../App/App";
import { OnTasksChangeHandlersContext } from "../Main/Main";
import { Button } from "antd";


type DeleteSubmittionMessageProps = {
    hostElement: HTMLElement;
    isOpen: boolean;
    closeHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    id: number;
}

export default function DeleteSubmittionMessage(props: DeleteSubmittionMessageProps){
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);
    const apiService = useContext(TaskAPIServiceContext);

    // Handler of delete submission.
    function onDeleteSubmitHandler(event: React.MouseEvent<HTMLElement, MouseEvent>){
        event.preventDefault();
        apiService.remove(props.id, tasksChangeHandlers.onDeleteNotifyHandler);
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.remove("blurry-rectangle");

        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.remove("disable-scrolling");
    }

    // If delete submission message is not invoked, return null.
    if(!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div id="deleteSubmissionMessage">
            <div id="content-holder">
                <div id="delete-badge-holder">
                    <div className="circle red-circle">
                        <div className="circle black-circle">
                            <p>!</p>
                        </div>
                    </div>
                </div>
                <div id="delete-text-holder">
                    Are you sure?
                </div>
                <div id="delete-buttons-holder">
                    <div className="button-holder">
                        <Button 
                            className="confirm-delete-task-button button" onClick={(event) => onDeleteSubmitHandler(event)}
                        >Delete</Button>
                    </div>
                    <div className="button-holder">
                        {/* <Button type="click" buttonClasses="cancel-delete-task-button button" onClickHandler={(event) => props.closeHandler(event)}>Cancel</Button> */}
                    </div>
                    </div>
            </div>
        </div>, props.hostElement
    )
}