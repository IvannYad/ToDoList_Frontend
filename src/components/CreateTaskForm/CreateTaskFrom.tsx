import "./CreateTaskForm.css"

export default function CreateTaskFrom(){
    return (
        <div id="task-create-card-holder">
            <div id="task-create-card-header">
                Create task
            </div>
            <div id="task-create-form-holder">
                <form>
                    <div id="task-create-form-title-row">
                        <label htmlFor="title-input-field">Title</label>
                        <input id="title-input-field" className="task-create-from-input title-input"/>
                    </div>
                    <div id="task-create-form-time-row">
                        <div className="time-input-holder">
                            <label htmlFor="start-time-input-field">Start time</label>
                            <input id="start-time-input-field" type="datetime-local" className="task-create-from-input time-input" />
                        </div>
                        <div className="time-input-holder">
                            <label htmlFor="end-time-input-field">End time</label>
                            <input id="end-time-input-field" type="datetime-local" className="task-create-from-input time-input" />
                        </div>
                    </div>
                    <div id="task-create-form-description-row">
                        <label htmlFor="description-input-field">Description</label>
                        <textarea id="description-input-field" rows={5} className="task-create-from-input description-input"></textarea>
                    </div>
                    <div id="task-create-form-type-row">
                        <label htmlFor="type-input-field">Type</label>
                        <select id="type-input-field" className="task-create-from-input type-input">
                            <option value="feature" className="type-options">Feature</option>
                            <option value="bug" className="type-options">Bug</option>
                        </select>
                    </div>
                    <div id="task-create-form-buttons-row">
                        <div className="button-holder">
                            <button className="create-task-button">Create</button>
                        </div>
                        <div className="button-holder">
                            <button className="cancel-creating-task-button">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    )   
}