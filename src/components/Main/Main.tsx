import Column from "../Column/Column";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css"

export default function Main(){
    return (
        <main>
            <div>
                <SearchForm />
            </div>
            <div>
                <div id="column-container">
                    <Column id="to-do-column"/>
                    <Column id="in-progress-column"/>
                    <Column id="done-column"/>
                </div>
            </div>
        </main>
    )
}