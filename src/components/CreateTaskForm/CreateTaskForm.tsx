import ReactDOM from "react-dom";
import "./CreateTaskForm.css"
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { TaskCreate } from "../../models/Task";
import { getDefaultTaskCreate } from "../../helperFunctions/GetDummyTasks";
import TaskValidator from "../../services/TaskValidator";
import { Converter } from "../../services/Converter";
import { TaskAPIServiceContext } from "../App/App";
import { OnTasksChangeHandlersContext } from "../Main/Main";

type CreateTaskFormProps = {
    hostElement: HTMLElement;
    isOpen: boolean;
    closeHandler: () => void;
}

export default function CreateTaskForm(props: CreateTaskFormProps){
    const [task, setTask] = useState<TaskCreate>(getDefaultTaskCreate());
    const [formValidator, setFormValidator] = useState(new TaskValidator());
    const titleInput = useRef<HTMLInputElement>(null);
    const startTimeInput = useRef<HTMLInputElement>(null);
    const endTimeInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);
    const typeInput = useRef<HTMLSelectElement>(null);
    const apiService = useContext(TaskAPIServiceContext);
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);

    useEffect(() => {
        setFormValidator((prev) => {
            prev.addValidation(isTitleValid);
            prev.addValidation(isTimeValid);
            prev.addValidation(isDescriptionValid);
            return prev;
        })
    }, []);


    function isTitleValid(): boolean{
        if (!titleInput.current!.value) return true;
        return titleInput.current!.value.length >= 5;
    }

    function isTimeValid(): boolean{
        if(!startTimeInput.current?.value || !endTimeInput.current?.value){
            return true;
        }
        
        const startTime = new Date(startTimeInput.current!.value);
        const endTime = new Date(endTimeInput.current!.value);
        return endTime > startTime;
    }

    function isDescriptionValid(): boolean{
        if (!descriptionInput.current!.value) return true;
        return descriptionInput.current!.value.length <= 150;
    }
    
    if(!props.isOpen) return null;

    function onTitleChangeHandler(event: ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        if(!isTitleValid()){
            document.getElementById("title-input-error")!.innerHTML = "Title minimum length is 5";
            return;
        }
        
        document.getElementById("title-input-error")!.innerHTML = "";
        setTask({ ...task, taskTitle: titleInput.current!.value})
    }

    function onTimeChangeHandler(event: ChangeEvent<HTMLInputElement>, spanId: string){
        event.preventDefault();
        
        if(!isTimeValid()){
            document.getElementById(spanId)!.innerHTML = "Start time can`t be greater then end time";
            return;
        }

        document.getElementById("start-time-input-error")!.innerHTML = "";
        document.getElementById("end-time-input-error")!.innerHTML = "";
        setTask({
            ...task,
            taskStartTime: startTimeInput.current!.value,
            taskEndTime: endTimeInput.current!.value
        })
    }

    function onDescriptionChangeHandler(event: ChangeEvent<HTMLTextAreaElement>){
        event.preventDefault();
        if(!isDescriptionValid()){
            document.getElementById("description-input-error")!.innerHTML = "Description maximum length is 150";
            if(descriptionInput.current!.value.length > 200) descriptionInput.current!.value = descriptionInput.current!.value.substring(0, 200);
            return;
        }

        document.getElementById("description-input-error")!.innerHTML = "";
        setTask({ ...task, additionalDescription: descriptionInput.current!.value})
    }

    function onTypeChangeHandler(event: ChangeEvent<HTMLSelectElement>){
        event.preventDefault();
        setTask({ ...task, type: Converter.stringToTaskType(typeInput.current!.value)});
    }

    function onFormSubmitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (!formValidator.validate()){
            return;
        }
        apiService.create(task, tasksChangeHandlers.onCreateHandler);
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.remove("blurry-rectangle");

        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.remove("disable-scrolling");
        props.closeHandler();
    }


    return ReactDOM.createPortal(
        <div id="task-create-card-holder">
            <div id="task-create-card-header">
                Create task
            </div>
            <div id="task-create-form-holder">
                <form id="create-task-form" onSubmit={(event) => onFormSubmitHandler(event)}>
                    <div id="task-create-form-title-row">
                        <label htmlFor="title-input-field">Title</label>
                        <input id="title-input-field" className="task-create-from-input title-input" 
                            name="taskTitle" onChange={(event) => onTitleChangeHandler(event)} 
                            ref={titleInput} required/>
                        <span id="title-input-error" className="task-input-error"></span>
                    </div>
                    <div id="task-create-form-time-row">
                        <div className="time-input-holder">
                            <label htmlFor="start-time-input-field">Start time</label>
                            <input id="start-time-input-field" type="datetime-local" className="task-create-from-input time-input" 
                                name="taskStartTime" ref={startTimeInput} onChange={(event) => onTimeChangeHandler(event, "start-time-input-error")} required/>
                            <div id="start-time-input-error" className="task-input-error"></div>
                        </div>
                        <div className="time-input-holder">
                            <label htmlFor="end-time-input-field">End time</label>
                            <input id="end-time-input-field" type="datetime-local" className="task-create-from-input time-input" 
                                name="taskEndTime" ref={endTimeInput} onChange={(event) => onTimeChangeHandler(event, "end-time-input-error")} required/>
                            <div id="end-time-input-error" className="task-input-error"></div>
                        </div>
                    </div>
                    <div id="task-create-form-description-row">
                        <label htmlFor="description-input-field">Description</label>
                        <textarea id="description-input-field" rows={5} className="task-create-from-input description-input" 
                        name="additionalDescription" ref={descriptionInput} onChange={(event) => onDescriptionChangeHandler(event)} required></textarea>
                        <div id="description-input-error" className="task-input-error"></div>
                    </div>
                    <div id="task-create-form-type-row">
                        <label htmlFor="type-input-field">Type</label>
                        <select id="type-input-field" className="task-create-from-input type-input"
                         name="type" ref={typeInput} onChange={(event) => onTypeChangeHandler(event)}>
                            <option value="feature" className="type-options">Feature</option>
                            <option value="bug" className="type-options">Bug</option>
                        </select>
                    </div>
                    <div id="task-create-form-buttons-row">
                        <div className="button-holder">
                            <button type="submit" className="create-task-button">Create</button>
                        </div>
                        <div className="button-holder">
                            <button type="submit" className="cancel-creating-task-button" onClick={() => props.closeHandler()}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>, props.hostElement
    )   
}