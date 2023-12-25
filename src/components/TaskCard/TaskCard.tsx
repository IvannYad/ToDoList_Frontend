import convertToReadableDate from "../../helperFunctions/convertToReadableDate";
import { Task } from "../../models/Task";
import TaskType from "../TaskTypeBadge/TaskTypeBadge";
import "./TaskCard.css"

type TaskCardProps = {
    data: Task;
}

export default function TaskCardInColumn(props: TaskCardProps){
    return (
        <div id="task-card-holder">
            <div id={`task-card-${props.data.id}`} className="task-card" draggable="true">
                <div id="card-header">
                    <div id="row-holder">
                        <div id="title-holder" className="card-title-text">{props.data.taskTitle}</div>
                        <div id="title-holder"><TaskType type={props.data.type}/></div>
                    </div>
                </div>
                <div id="card-time-display">
                    <div id="row-holder" className="card-time-text">
                        {convertToReadableDate(props.data.taskStartTime)} - {convertToReadableDate(props.data.taskEndTime)}
                    </div>
                </div>
                <div id="card-description-display">
                    <div id="row-holder" className="card-description-text">
                        {props.data.additionalDescription}
                    </div>
                </div>
            </div>
            
        </div>
    )
}