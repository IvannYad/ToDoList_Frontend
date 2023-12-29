import "./CreateUpdateTaskFormModal.css"
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import { Task, TaskCreate } from "../../../models/Task";
import TaskValidator from "../../../services/TaskValidator";
import { OnTasksChangeHandlersContext } from "../../Main/Main";
import { TaskAPIServiceContext } from "../../App/App";
import CardHeader from "../../ui/CardHeader/CardHeader";
import { Converter } from "../../../services/Converter";
import dayjs from "dayjs";
import convertToReadableDate from "../../../helperFunctions/convertToReadableDate";

type TaskFormProps = {
    isOpen: boolean;
    closeHandler: () => void;
    type: "create" | "update";
    prevTaskData: Task;
}

export default function CreateUpdateTaskFormModal(props: TaskFormProps){
    const [form] = Form.useForm();
    const [task, setTask] = useState<Task>(props.prevTaskData);
    const [formValidator, setFormValidator] = useState(new TaskValidator());

    // useRef return actual value only when input, to which useRef refers, changes  
    const titleInput = useRef<HTMLInputElement>(null);
    const startTimeInput = useRef<HTMLInputElement>(null);
    const endTimeInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);
    const typeInput = useRef<HTMLSelectElement>(null);
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);
    const apiService = useContext(TaskAPIServiceContext);

    useEffect(() => {
        setFormValidator((prev) => {
            prev.addValidation(isTitleValid);
            prev.addValidation(isTimeValid);
            prev.addValidation(isDescriptionValid);
            return prev;
        })
    }, []);

    // Function for input validation.
    function isTitleValid(): boolean{
        if (!titleInput.current!.value) return true;
        return titleInput.current!.value.length >= 5 && titleInput.current!.value.length <= 35;
    }

    function isTimeValid(): boolean{
        if(!startTimeInput.current?.value || !endTimeInput.current?.value){
            return true;
        }
        
        const startTime = new Date(startTimeInput.current!.value);
        const endTime = new Date(endTimeInput.current!.value);
        return endTime > startTime;
    }

    function isDescriptionValid(): boolean{
        if (!descriptionInput.current!.value) return true;
        return descriptionInput.current!.value.length <= 150;
    }
    
    // If form wasn`t invoken, return null. 
    if(!props.isOpen) return null;

    // Handlers for input change.
    function onTitleChangeHandler(event: ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        setTask({ ...task, taskTitle: titleInput.current!.value})
    }

    // function onTimeChangeHandler(event: ChangeEvent<HTMLInputElement>){
    //     event.preventDefault();
        
    //     setTask({
    //         ...task,
    //         taskStartTime: startTimeInput.current!.value,
    //         taskEndTime: endTimeInput.current!.value
    //     })
    // }

    function onDescriptionChangeHandler(event: ChangeEvent<HTMLTextAreaElement>){
        event.preventDefault();
        if(!isDescriptionValid()){
            document.getElementById("description-input-error")!.innerHTML = "Description maximum length is 150";
            if(descriptionInput.current!.value.length > 200) descriptionInput.current!.value = descriptionInput.current!.value.substring(0, 200);
            return;
        }

        document.getElementById("description-input-error")!.innerHTML = "";
        setTask({ ...task, additionalDescription: descriptionInput.current!.value})
    }

    function onTypeChangeHandler(event: ChangeEvent<HTMLSelectElement>){
        event.preventDefault();
        setTask({ ...task, type: Converter.stringToTaskType(typeInput.current!.value)});
    }

    function onCancelHandler(event: React.MouseEvent<HTMLElement, MouseEvent>){
        event.preventDefault();
        props.closeHandler();
    }

    // Handler for form submitting.
    function onFormSubmitHandler(event: FormEvent<HTMLFormElement>){
        // Always call .preventDefault() to aviod unexpected things.
        event.preventDefault();
        if (!formValidator.validate()){
            // If data in form input field is not valid.
            return;
        }

        if(props.type === "create"){
            // Creating task.
            const taskCreate: TaskCreate = {
                ...task
            };
            apiService.create(taskCreate, tasksChangeHandlers.onCreateNotifyHandler);
            
            // If task created, remove form and blurry background.
            const curtainsElement = document.getElementById("curtains") as HTMLElement;
            curtainsElement.classList.remove("blurry-rectangle");
            const rootElement = document.getElementsByTagName("body")[0] as HTMLElement;
            rootElement.classList.remove("disable-scrolling");
        }
        else{
            // Updating task.
            const updateTask: Task = {
                ...task,
                id: +(document.getElementById("task-id-input") as HTMLInputElement).value
            };
            apiService.update(updateTask.id, updateTask, tasksChangeHandlers.onUpdateNotifyHandler);
        }
        
        // When form submitting logic is processed, notify component that holds tasks array about update.
        props.closeHandler();
    }

    return (
        <Modal
            open={props.isOpen}
            centered={true}
            className="create-update-task-form-modal"
            closable={false}
            footer={
                [
                    <div className="row-holder">
                            {props.type === "create" ? 
                        <Button
                            onClick={(event) => {
                                event.preventDefault();
                                form.validateFields()
                                    .then((values) => {
                                        form.resetFields();
                                        apiService.create(values, tasksChangeHandlers.onCreateNotifyHandler);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                                tasksChangeHandlers.onCreateNotifyHandler()
                                }
                            }
                            className="create-task-button button"
                        >Create</Button> : 
                        <Button
                            onClick={(event) => {
                                event.preventDefault();
                                form.validateFields()
                                    .then((values) => {
                                        form.resetFields();
                                        apiService.update(1, values, tasksChangeHandlers.onCreateNotifyHandler);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                                tasksChangeHandlers.onCreateNotifyHandler()
                                }
                            }
                            className="update-task-button button"
                        >Update</Button>},
                        <Button
                            onClick={(event) => {
                                event.preventDefault();
                                onCancelHandler(event)
                                }
                            }
                            className="cancel-button button"
                        >Cancel</Button>
                    </div>
                ]
            }
        > 
            <CardHeader headerClasses={`${props.type}-header header`}>{props.type === "create" ? "Create Task" : "Update task"}</CardHeader>
            <div className="task-create-update-form-holder">
                <Form
                    layout="vertical"
                    className="create-task-form" 
                    onFinish={(event) => onFormSubmitHandler(event)}
                    form={form}
                    >
                        <Form.Item name="id"  hidden={true}>
                            <Input value={props.prevTaskData.id}disabled={true}/>
                        </Form.Item>
                        
                    <Form.Item
                        className="title-input-holder"
                        name="title"
                        label="Title"
                        rules={
                            [
                                { 
                                    required: true, message: 'Please input the task title!' 
                                },
                                ({getFieldValue}) =>({
                                    validator(_, value){
                                        if(!value || (getFieldValue("title").length >= 5 && getFieldValue("title").length <= 35)){
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Title length must be between 5 and 35"));
                                    }
                                })
                            ]
                        }
                    >
                        <Input 
                            className="task-create-form-input title-input"
                            onChange={(event) => onTitleChangeHandler(event)}
                            defaultValue={props.prevTaskData.taskTitle}   
                        />
                    </Form.Item>
                    <div className="task-create-form-time-row">
                        <Form.Item
                            className="time-input-holder"
                            name="start-time-picker" 
                            label="Start time"
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the start time!' 
                                    },
                                ]
                            }>
                            <DatePicker showTime={{
                                use12Hours: true
                            }}
                                className="task-create-form-input time-input"
                                //onChange={(event) => onTimeChangeHandler(event)}
                                defaultValue={dayjs(convertToReadableDate(props.prevTaskData.taskStartTime))} 
                                format={"YYYY-MM-DD HH:mm A"}/>
                        </Form.Item>
                        <Form.Item
                            className="time-input-holder"
                            name="end-time-picker" 
                            label="End time"
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the end time!' 
                                    },
                                ]
                            }>
                            <DatePicker showTime={{
                                use12Hours: true
                            }}
                                defaultValue={dayjs(convertToReadableDate(props.prevTaskData.taskEndTime))} 
                                format={"YYYY-MM-DD HH:mm A"}
                                className="task-create-form-input time-input"/>
                        </Form.Item>
                    </div>
                    <div id="task-create-form-description-row">
                        <label htmlFor="description-input-field">Description</label>
                        <textarea id="description-input-field" rows={5} className="task-create-from-input description-input" 
                        name="additionalDescription" ref={descriptionInput} onChange={(event) => onDescriptionChangeHandler(event)}
                        defaultValue={props.prevTaskData.additionalDescription} required></textarea>
                        <div id="description-input-error" className="task-input-error"></div>
                    </div>
                    <div id="task-create-form-type-row">
                        <label htmlFor="type-input-field">Type</label>
                        <select id="type-input-field" className="task-create-from-input type-input"
                         name="type" ref={typeInput} onChange={(event) => onTypeChangeHandler(event)} defaultValue={props.prevTaskData.type}>
                            <option value="feature" className="type-options">Feature</option>
                            <option value="bug" className="type-options">Bug</option>
                        </select>
                    </div>
                </Form>
            </div>
            
        </Modal>
    )   
}