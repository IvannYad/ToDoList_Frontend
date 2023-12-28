import { useContext, useEffect, useState } from "react";
import Column from "../Column/Column";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css"
import { Task } from "../../models/Task";
import { TaskAPIServiceContext } from "../App/App";
import React from "react";

type TasksChangeHandlers = {
    onUpdateNotifyHandler: () => void;
    onCreateNotifyHandler: () => void;
    onDeleteNotifyHandler: () => void;
    onSearchNotificationHandler: () => void
}

// Context with handlers on changes of tasks list.
export const OnTasksChangeHandlersContext = React.createContext<TasksChangeHandlers>({
    onCreateNotifyHandler: () => {},
    onDeleteNotifyHandler: () => {},
    onUpdateNotifyHandler: () => {},
    onSearchNotificationHandler: () => {}
});

export type DropHandlerProps = {
    event: DragEvent; 
    element: HTMLElement; 
    tasks: Task[]; 
    id: "to-do-column" | "in-progress-column" | "done-column";
}

export default function Main(){
    const taskAPIService = useContext(TaskAPIServiceContext);
    const [tasksFilter, setTasksFilter] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isChanged, setIsChanged] = useState(false);
    
    useEffect(() => {
        // Executes only when isChanged variable changes.
        console.log(tasksFilter);
        taskAPIService.getAll(filterFunction())
            .then(response => {
                if(response){
                    setTasks(response);
                }
            })
        // Reseting isChange variable   
        setIsChanged(false);
    }, [isChanged])
    
    // Implementation of handlers of tasks array change.
    function searchNotificationHandler(){
        setIsChanged(true);
    }

    function updateNotificationHandler(){
        setIsChanged(true);
    }

    function createNotificationHandler(){
        setIsChanged(true);
    }

    function deleteNotificationHandler(){
        setIsChanged(true);
    }
    
    // Function, that returns arrow function or null for tasks filtering.
    function filterFunction(): ((task: Task) => boolean) | null{
        if(!tasksFilter || tasksFilter.trim().length === 0){
            // If search input in empty or not provided, assume we don`t have filter.  
            return null;
        }

        // Returning filter function.
        return (task: Task) => {
            return task.taskTitle.toLowerCase().includes(tasksFilter)
            || task.status.toLowerCase().includes(tasksFilter)
            || task.type.toLowerCase().includes(tasksFilter);
        }
    }

    // Creating variable that will store handlers on tasks array change,
    const tasksChangeHandlers: TasksChangeHandlers = {
        onCreateNotifyHandler: createNotificationHandler,
        onDeleteNotifyHandler: deleteNotificationHandler,
        onUpdateNotifyHandler: updateNotificationHandler,
        onSearchNotificationHandler: searchNotificationHandler
    };
    return (
        <OnTasksChangeHandlersContext.Provider value={tasksChangeHandlers}>
        <main>
            <div className="main-div">
                <SearchForm updateFiter={setTasksFilter}/>
            </div>
            <div className="main-div">
                <div id="column-container">
                    <Column id="to-do-column" title="Todo" tasks={tasks.filter(task => task.status === "to-do")}/>
                    <Column id="in-progress-column" title="In progress" tasks={tasks.filter(task => task.status === "in-progress")}/>
                    <Column id="done-column" title="Done" tasks={tasks.filter(task => task.status === "done")}/>
                </div>
            </div>
        </main>
        </OnTasksChangeHandlersContext.Provider>
        
    )
}