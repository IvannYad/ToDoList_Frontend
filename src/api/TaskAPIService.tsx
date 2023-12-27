import axios from "axios";
import { Task, TaskCreate } from "../models/Task";
import ITaskAPIService from "./ITaskAPIService";
import { getDummyTasks } from "../helperFunctions/GetDummyTasks";

export default class TaskAPIService implements ITaskAPIService{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(filter: ((task: Task) => boolean) | null): Promise<Task[] | void> {
        let tasksToReturn: Task[];
        const promise = axios.get(this.url);
        const dataPromise = promise
        .then(response => {
            console.log(response.data!.result);
            tasksToReturn = response.data!.result;
            if (filter){
                tasksToReturn = tasksToReturn!.filter((task: Task) => filter(task));
            }
            return tasksToReturn;
        })
        .catch(error => console.log(error))

        return dataPromise;
    }
    get(id: number): Task {
        const taskToReturn = getDummyTasks()[0];
        axios.get(`${this.url}/${id}`)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error))
        return taskToReturn;
    }
    create(task: TaskCreate, onCreateNotifyHandler: () => void): void {
        console.log(task);
        axios.post(this.url, task)
            .then(res => {
                console.log(res.data);
                onCreateNotifyHandler();
            })
            .catch(error => {
                console.log(error);
            });
    }
    update(id: number, newTask: Task, onUpdteNotifyHandler: () => void): void {
        console.log(id, newTask);
        axios.put(`${this.url}/${id}`, newTask)
            .then(res => {
                console.log("MyRes" + res);
                onUpdteNotifyHandler();
            });
    }
    remove(id: number, onDeleteNotifyHandler: () => void): void {
        axios.delete(`${this.url}/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        onDeleteNotifyHandler();
      })
      .catch(error =>{
        console.log(error);
      })
    }

}