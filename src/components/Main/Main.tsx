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
                    console.log(response);
                    console.log(tasks);
                }
            })
    }, [])

    return (
        <main>
            <div className="main-div">
                <SearchForm />
            </div>
            <div className="main-div">
                <div id="column-container">
                    <Column id="to-do-column" title="Todo" tasks={tasks.filter(task => task.status === "to-do")}/>
                    <Column id="in-progress-column" title="In progress" tasks={tasks.filter(task => task.status === "in-progress")}/>
                    <Column id="done-column" title="Done" tasks={tasks.filter(task => task.status === "done")}/>
                </div>
            </div>
        </main>
    )
}