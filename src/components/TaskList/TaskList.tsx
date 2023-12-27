import React from "react";
import TaskCardInColumn from "../TaskCardInColumn/TaskCardInColumn";
import "./TaskList.css"
import { Task } from "../../models/Task";

type TaskListProps = {
    tasks: Task[];
    columnId: "to-do-column" | "in-progress-column" | "done-column";
}

export default function TaskList(props: TaskListProps){
    return (
        <React.Fragment>
            <ul id="task-card-ul">
                {props.tasks.map((task) => {
                    return <li key={task.id}>
                        <TaskCardInColumn data={task}/>
                    </li>
                })}
            </ul>
        </React.Fragment>
    )
}