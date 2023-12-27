import "./DeleteSubmittionMessage.css"

export default function DeleteSubmittionMessage(){
    return (
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
                        <button id="cancel-delete-task">Cancel</button>
                    </div>
                    </div>
            </div>
        </div>
    )
}