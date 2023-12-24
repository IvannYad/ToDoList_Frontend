import "./TaskCard.css"
import { TaskData } from "../TaskList/TaskList";
import TaskType from "../TaskTypeBadge/TaskTypeBadge";

type TaskCardProps = {
    data: TaskData;
}

export default function TaskList(props: TaskCardProps){
    return (
        <div id="task-card-holder">
            <div className="task-card" draggable="true">
                <div id="card-header">
                    <div id="row-holder">
                        <div id="title-holder" className="card-title-text">{props.data.title}</div>
                        <div id="title-holder"><TaskType type={props.data.type}/></div>
                    </div>
                </div>
                <div id="card-time-display">
                    <div id="row-holder" className="card-time-text">
                        {props.data.startDate} - {props.data.endDate}
                    </div>
                </div>
                <div id="card-description-display">
                    <div id="row-holder" className="card-description-text">
                        {props.data.description}
                    </div>
                </div>
            </div>
            
        </div>
    )
}