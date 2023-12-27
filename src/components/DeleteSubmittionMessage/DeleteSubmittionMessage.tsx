import ReactDOM from "react-dom";
import "./DeleteSubmittionMessage.css"
import { useContext } from "react";
import { TaskAPIServiceContext } from "../App/App";
import { OnTasksChangeHandlersContext } from "../Main/Main";

type DeleteSubmittionMessageProps = {
    hostElement: HTMLElement;
    isOpen: boolean;
    closeHandler: () => void;
    id: number;
}

export default function DeleteSubmittionMessage(props: DeleteSubmittionMessageProps){
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);
    const apiService = useContext(TaskAPIServiceContext);

    // Handler of delete submission.
    function onDeleteSubmitHandler(){
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
                        <button id="confirm-delete-task" onClick={() => onDeleteSubmitHandler()}>Delete</button>
                    </div>
                    <div className="button-holder">
                        <button id="cancel-delete-task" onClick={() => props.closeHandler()}>Cancel</button>
                    </div>
                    </div>
            </div>
        </div>, props.hostElement
    )
}