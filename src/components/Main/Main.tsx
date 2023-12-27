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
    console.log("func start");
    const taskAPIService = useContext(TaskAPIServiceContext);
    const [tasksFilter, setTasksFilter] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isChanged, setIsChanged] = useState(false);
    useEffect(() => {
        console.log(tasksFilter);
        taskAPIService.getAll(filterFunction())
            .then(response => {
                if(response){
                    setTasks(response);
                }
            })
            setTimeout(() => {}, 10);
            console.log("useEffect end");
            setIsChanged(false);
    }, [isChanged])
    
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
    
    function filterFunction(): ((task: Task) => boolean) | null{
        if(!tasksFilter || tasksFilter.trim().length === 0){
            return null;
        }

        return (task: Task) => {
            return task.taskTitle.toLowerCase().includes(tasksFilter)
            || task.status.toLowerCase().includes(tasksFilter)
            || task.type.toLowerCase().includes(tasksFilter);
        
        }
    }

    const tasksChangeHandlers: TasksChangeHandlers = {
        onCreateNotifyHandler: createNotificationHandler,
        onDeleteNotifyHandler: deleteNotificationHandler,
        onUpdateNotifyHandler: updateNotificationHandler,
        onSearchNotificationHandler: searchNotificationHandler
    }
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