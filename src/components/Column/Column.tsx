import AddTaskButton from "../AddTaskButton/AddTaskButton";
import TaskList from "../TaskList/TaskList";
import "./Column.css"

type ColumnProps = {
    id: "to-do-column" | "in-progress-column" | "done-column";
    title: string;
}

export default function Column({id, title}: ColumnProps){
    return (
        <div id={id} className="column">
            <div className="column-header">
                {title}
            </div>
            <div>
                <TaskList />
                { id === "to-do-column" ? <AddTaskButton /> : ""}
            </div>
        </div>
    )   
}