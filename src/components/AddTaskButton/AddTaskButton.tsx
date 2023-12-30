import { useState } from "react";
import "./AddTaskButton.css"
import { getDefaultTask } from "../../helperFunctions/GetDummyTasks";
import CreateUpdateTaskFormModal from "../modals/CreateUpdateTaskFormModal/CreateUpdateTaskFormModal";
import { Button } from "antd";

export default function AddTaskButton(){
    const [isOpen, setIsOpen] = useState(false);
    // Function that handles creating form opening.
    function openHandler(event: React.MouseEvent<HTMLElement, MouseEvent>): void{
        event.preventDefault();
        setIsOpen(true);
    }

    // Function that handles creating form closing.
    function closeHandler(): void{
        setIsOpen(false);
    }

    return (
        <div className="add-task-button-holder">
            <Button className="add-task-button" onClick={(event) => openHandler(event)}>+</Button>
            <CreateUpdateTaskFormModal type="create" prevTaskData={getDefaultTask()} isOpen={isOpen} closeHandler={closeHandler} />
        </div>
        
    )   
}