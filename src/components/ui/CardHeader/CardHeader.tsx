import { ReactNode } from "react";
import "./CardHeader.css"

type CardHeaderProps= {
    headerClasses: string;
    children: ReactNode;
}

export default function CardHeader(props: CardHeaderProps){
    return (
        <div className={props.headerClasses}>
            {props.children}
        </div>
    )
}