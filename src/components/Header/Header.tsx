import "./Header.css"

export default function Header(){
    function onMouseOverHandler(){
        (document.getElementById("header-checklist-icon") as HTMLImageElement).src = "../../../public/checklist-hover.svg";
    }

    function onMouseLeaveHandler(){
        (document.getElementById("header-checklist-icon") as HTMLImageElement).src = "../../../public/checklist.svg";
    }

    return (
        <header>
            <a href="/" onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
                <img id="header-checklist-icon" src="../../../public/checklist.svg"/>
                ToDo List
            </a>
        </header>
    )   
}