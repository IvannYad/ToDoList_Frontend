import React from "react";
import TaskCard from "../TaskCardInColumn/TaskCardInColumn";
import "./TaskList.css"
import { Task } from "../../models/Task";

type TaskListProps = {
    tasks: Task[];
    columnId: "to-do-column" | "in-progress-column" | "done-column";
}

export default function TaskList(props: TaskListProps){
    let tasksToPass = props.tasks;
    if(props.columnId === "to-do-column"){
        tasksToPass = tasksToPass.filter(task => task.status === "to-do");
    }
    if(props.columnId === "in-progress-column"){
        tasksToPass = tasksToPass.filter(task => task.status === "in-progress");
    }
    if(props.columnId === "done-column"){
        tasksToPass = tasksToPass.filter(task => task.status === "done");
    }
    return (
        <React.Fragment>
            <ul id="task-card-ul">
                {tasksToPass.map((task) => {
                    return <li key={task.id}>
                        <TaskCard data={task}/>
                    </li>
                })}
            </ul>
            
            
        </React.Fragment>
        
        
    )
}