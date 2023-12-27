import ReactDOM from "react-dom";
import "./DeleteSubmittionMessage.css"

type DeleteSubmittionMessageProps = {
    hostElement: HTMLElement;
    isOpen: boolean;
    closeHandler: () => void;
}

export default function DeleteSubmittionMessage(props: DeleteSubmittionMessageProps){
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
                        <button id="confirm-delete-task">Delete</button>
                    </div>
                    <div className="button-holder">
                        <button id="cancel-delete-task" onClick={() => props.closeHandler()}>Cancel</button>
                    </div>
                    </div>
            </div>
        </div>, props.hostElement
    )
}