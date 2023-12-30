import { useState } from "react";
import "./AddTaskButton.css"
import { getDefaultTask } from "../../helperFunctions/GetDummyTasks";
import Button from "../ui/Button/Button";
import CreateUpdateTaskFormModal from "../modals/CreateUpdateTaskFormModal/CreateUpdateTaskFormModal";

export default function AddTaskButton(){
    const [isOpen, setIsOpen] = useState(false);
    // Function that handles creating form opening.
    function openHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void{
        event.preventDefault();
        setIsOpen(true);
    }

    // Function that handles creating form closing.
    function closeHandler(): void{
        setIsOpen(false);
    }

    return (
        <div className="add-task-button-holder">
            <Button type="click" buttonClasses="add-task-button button-on-board" onClickHandler={(event) => openHandler(event)}>+</Button>
            <CreateUpdateTaskFormModal type="create" prevTaskData={getDefaultTask()} isOpen={isOpen} closeHandler={closeHandler} />
        </div>
        
    )   
}