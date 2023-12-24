import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskList.css"

export type TaskData = {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: "to-do" | "in-progress" | "done";
    type: "feature" | "bug";
}

type TaskListProps = {
    tasks: TaskData[];
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
                    return <li>
                        <TaskCard data={task}/>
                    </li>
                })}
            </ul>
            
            
        </React.Fragment>
        
        
    )
}