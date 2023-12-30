import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import "./SearchForm.css"
import { OnTasksChangeHandlersContext } from "../Main/Main";

type SearchFormProps = {
    updateFiter: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchFrom(props: SearchFormProps){
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);
    const [filter, setFilter] = useState<string>("");
    const filterInput = useRef<HTMLInputElement>(null);
    
    // Handler for input change.
    function onChangeHandler(event: ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        console.log("Setting filter");
        setFilter(filterInput.current!.value);
        console.log(filterInput.current!.value);
        console.log(`filter after setting: ${filter}`);
    }

    // Handler for form submission.
    function onSubmitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        props.updateFiter(filter.toLowerCase());
        tasksChangeHandlers.onSearchNotificationHandler();
    }

    return (
        <form onSubmit={(event) => onSubmitHandler(event)} id="search-form">
            <input onChange={onChangeHandler} type="text" ref={filterInput} id="input" placeholder="Filter by name, status, type"/>
            <button type="submit" id="button" className="">Search</button>
        </form>
    )
}