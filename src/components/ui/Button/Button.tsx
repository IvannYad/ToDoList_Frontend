import { ReactNode } from "react";
import "./Button.css"

type GeneralButtonProps = {
    buttonClasses: string;
    children: ReactNode;
}

type ClickButtonProps = {
    type: "click"
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & GeneralButtonProps

type SubmitButtonProps = {
    type: "submit",
} & GeneralButtonProps

type ButtonProps = ClickButtonProps | SubmitButtonProps;

export default function Button(props: ButtonProps){
    
    return (
        props.type === "click" ? 
        <button onClick={(event) => props.onClickHandler(event)} className={props.buttonClasses}>{props.children}</button> :
        <button type={props.type} className={props.buttonClasses}>{props.children}</button>
    )
}