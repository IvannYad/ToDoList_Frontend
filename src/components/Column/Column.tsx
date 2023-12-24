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
        </div>
    )   
}