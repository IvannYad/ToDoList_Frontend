import "./SearchForm.css"

export default function SearchFrom(){
    return (
        <form id="search-form">
            <input type="text" id="input" placeholder="Filter by name, status, type"/>
            <button id="button" className="button-on-board">Search</button>
        </form>
    )
}