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

export default function TaskList(){
    const taskData: TaskData = {
        id: 1,
        title: "Hello",
        description: "Lorem Ipsun dolores...",
        startDate: "11.11.1111",
        endDate: "22.22.2222",
        status: "to-do",
        type: "bug",
    }
    return (
        <React.Fragment>
            <TaskCard data={taskData}/>
            <TaskCard data={taskData}/>
        </React.Fragment>
        
        
    )
}