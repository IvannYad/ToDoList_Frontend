import "./CreateUpdateTaskFormModal.css"
import { useContext } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { Task } from "../../../models/Task";
import { OnTasksChangeHandlersContext } from "../../Main/Main";
import { TaskAPIServiceContext } from "../../App/App";
import CardHeader from "../../ui/CardHeader/CardHeader";
import dayjs  from "dayjs";
import convertToReadableDate from "../../../helperFunctions/convertToReadableDate";
import TextArea from "antd/es/input/TextArea";

type TaskFormProps = {
    isOpen: boolean;
    closeHandler: () => void;
    type: "create" | "update";
    prevTaskData: Task;
}

export default function CreateUpdateTaskFormModal(props: TaskFormProps){
    const [form] = Form.useForm();
    const tasksChangeHandlers = useContext(OnTasksChangeHandlersContext);
    const apiService = useContext(TaskAPIServiceContext);

    
    // If form wasn`t invoken, return null. 
    if(!props.isOpen) return null;

    // Handlers for input change.
    function onCancelHandler(event: React.MouseEvent<HTMLElement, MouseEvent>){
        event.preventDefault();
        props.closeHandler();
    }

    // Handler for form submitting.
    function onFormSubmitHandler(event:React.MouseEvent<HTMLElement, MouseEvent>){
        // Always call .preventDefault() to aviod unexpected things.
        event.preventDefault();
        form.validateFields()
            .then((values) => {
                const task: Task ={
                    ...values,
                    status: props.prevTaskData.status
                };
                form.resetFields();
                if (props.type === "create"){
                    apiService.create(task, tasksChangeHandlers.onCreateNotifyHandler);
                }
                else{
                    console.log("Hello");
                    apiService.update(task.id, task, tasksChangeHandlers.onUpdateNotifyHandler);
                }
                
                props.closeHandler();
            })
            .catch(error => {
                console.log(error);
            })
}
    
    return (
        <Modal
            open={props.isOpen}
            centered={true}
            className="create-update-task-form-modal"
            closable={false}
            footer={
                <div className="row-holder">
                        {props.type === "create" ? 
                    <Button
                        onClick={
                            (event) => {onFormSubmitHandler(event);}
                        }
                        className="create-task-button button"
                    >Create</Button> : 
                    <Button
                    onClick={
                        (event) => {onFormSubmitHandler(event);}
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
                    <Form.Item initialValue={props.prevTaskData.id} name="id"  hidden={true}>
                        <Input />
                    </Form.Item>
                        
                    <Form.Item
                        className="title-input-holder"
                        name="taskTitle"
                        label="Title"
                        initialValue={props.prevTaskData.taskTitle}
                        rules={
                            [
                                { 
                                    required: true, message: 'Please input the task title!' 
                                },
                                ({getFieldValue}) =>({
                                    validator(_, value){
                                        if(!value || (getFieldValue("taskTitle").length >= 5 && getFieldValue("taskTitle").length <= 35)){
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
                        />
                    </Form.Item>
                    <div className="task-create-form-time-row">
                        <Form.Item
                            className="time-input-holder"
                            name="taskStartTime" 
                            label="Start time"
                            initialValue={props.prevTaskData.taskStartTime ? dayjs(convertToReadableDate(props.prevTaskData.taskStartTime)) : dayjs()}
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the start time!' 
                                    },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!value || (getFieldValue("taskEndTime").toDate() > value.toDate())){
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Start time can`t be greater than end time"));
                                        }
                                    })
                                ]
                            }>
                            <DatePicker showTime={{
                                use12Hours: true
                            }}
                                className="task-create-form-input time-input"
                                //onChange={(event) => onTimeChangeHandler(event)}
                                format={"YYYY-MM-DD HH:mm A"}/>
                        </Form.Item>
                        <Form.Item
                            className="time-input-holder"
                            name="taskEndTime" 
                            label="End time"
                            initialValue={props.prevTaskData.taskEndTime ? dayjs(convertToReadableDate(props.prevTaskData.taskEndTime)) : dayjs()}
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the end time!' 
                                    },
                                    ({getFieldValue}) =>({
                                        validator(_, value){
                                            if(!value || (getFieldValue("taskStartTime") < value)){
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("End time can`t be less than start time"));
                                        }
                                    })
                                ]
                            }>
                            <DatePicker showTime={{
                                use12Hours: true
                            }}
                                format={"YYYY-MM-DD HH:mm A"}
                                className="task-create-form-input time-input"/>
                        </Form.Item>
                    </div>
                    <Form.Item
                            className="description-input-holder"
                            name="additionalDescription" 
                            label="Description"
                            initialValue={props.prevTaskData.additionalDescription}
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the description!' 
                                    },
                                ]
                            }>
                            <TextArea
                                className="task-create-form-input description-input"
                                showCount maxLength={150} rows={4}
                            />
                    </Form.Item>
                    <Form.Item
                            className="type-input-holder"
                            name="type" 
                            label="Type"
                            initialValue={props.prevTaskData.type}
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the type!' 
                                    },
                                ]
                            }>
                            <Select
                                className="task-create-form-input type-input"
                                options={[
                                    {value: "feature", label: "Feature"},
                                    {value: "bug", label: "Bug"}
                                ]}
                            />
                    </Form.Item>
                </Form>
            </div>
            
        </Modal>
    )   
}