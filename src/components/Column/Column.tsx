import "./Column.css"

type ColumnProps = {
    id: string;
}

export default function Column({id}: ColumnProps){
    return (
        <div id={id} className="column">

        </div>
    )   
}