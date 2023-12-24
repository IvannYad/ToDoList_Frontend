import Column from "../Column/Column";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css"

export default function Main(){
    return (
        <main>
            <div className="main-div">
                <SearchForm />
            </div>
            <div className="main-div">
                <div id="column-container">
                    <Column id="to-do-column" title="Todo"/>
                    <Column id="in-progress-column" title="In progress"/>
                    <Column id="done-column" title="Done"/>
                </div>
            </div>
        </main>
    )
}