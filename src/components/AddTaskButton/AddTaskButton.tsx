import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm"
import "./AddTaskButton.css"
import { Task } from "../../models/Task";
import { getDefaultTask } from "../../helperFunctions/GetDummyTasks";

export default function AddTaskButton(){
    const [isOpen, setIsOpen] = useState(false);
    const hostElement = document.getElementById("additional-elements-holder") as HTMLElement;
    
    // Function that handles creating form opening.
    function openHandler(): void{
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.add("blurry-rectangle");
        
        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.add("disable-scrolling");
        setIsOpen(true);
    }

    // Function that handles creating form closing.
    function closeHandler(): void{
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.remove("blurry-rectangle");

        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.remove("disable-scrolling");
        setIsOpen(false);
    }

    // Get default task with empty property values to pass to form. 
    const taskData: Task = getDefaultTask(); 
    return (
        <div className="add-task-button-holder">
            <button className="add-task-button button-on-board" onClick={() => openHandler()}>+</button>
            <TaskForm type="create" hostElement={hostElement} isOpen={isOpen} closeHandler={closeHandler} prevTaskData={taskData}/>
        </div>
        
    )   
}