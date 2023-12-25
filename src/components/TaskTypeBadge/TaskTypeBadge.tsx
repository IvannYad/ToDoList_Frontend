import "./TaskTypeBadge.css"

type TaskTypeProps = {
    type: string;
}

export default function TaskType(props: TaskTypeProps){
    return (
        <div id="task-type-badge" className={`badge-${props.type}`}>{props.type}</div>
    )
}