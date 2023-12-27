import { useContext, useEffect, useState } from "react";
import Column from "../Column/Column";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css"
import { Task } from "../../models/Task";
import { TaskAPIServiceContext } from "../App/App";


export type DropHandlerProps = {
    event: DragEvent; 
    element: HTMLElement; 
    tasks: Task[]; 
    id: "to-do-column" | "in-progress-column" | "done-column";
}

export default function Main(){
    const taskAPIService = useContext(TaskAPIServiceContext);
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        taskAPIService.getAll(null)
            .then(response => {
                if(response){
                    setTasks(response);
                }
            })
    }, [tasks])

    function updateNotificationHandler(){
        taskAPIService.getAll(null)
            .then(response => {
                if(response){
                    setTasks(response);
                }
            })
    }

    return (
        <main>
            <div className="main-div">
                <SearchForm />
            </div>
            <div className="main-div">
                <div id="column-container">
                    <Column id="to-do-column" title="Todo" tasks={tasks.filter(task => task.status === "to-do")} updateNotification={updateNotificationHandler}/>
                    <Column id="in-progress-column" title="In progress" tasks={tasks.filter(task => task.status === "in-progress")} updateNotification={updateNotificationHandler}/>
                    <Column id="done-column" title="Done" tasks={tasks.filter(task => task.status === "done")} updateNotification={updateNotificationHandler}/>
                </div>
            </div>
        </main>
    )
}