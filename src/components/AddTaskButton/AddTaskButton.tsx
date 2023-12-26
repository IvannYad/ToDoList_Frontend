import { useState } from "react";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm"
import "./AddTaskButton.css"

export default function AddTaskButton(){
    const [isOpen, setIsOpen] = useState(false);
    const hostElement = document.getElementById("additional-elements-holder") as HTMLElement;
    
    function openHandler(): void{
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.add("blurry-rectangle");
        
        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.add("disable-scrolling");
        setIsOpen(true);
    }

    function closeHandler(): void{
        const curtainsElement = document.getElementById("curtains") as HTMLElement;
        curtainsElement.classList.remove("blurry-rectangle");

        const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
        rootElement.classList.remove("disable-scrolling");
        setIsOpen(false);
    }
    
    
    return (
        <div className="add-task-button-holder">
            <button className="add-task-button button-on-board" onClick={() => openHandler()}>+</button>
            <CreateTaskForm hostElement={hostElement} isOpen={isOpen} closeHandler={closeHandler}/>
        </div>
        
    )   
}