import { Task, TaskCreate } from "../models/Task";


export default interface ITaskAPIService{
    getAll(filter: ((task: Task) => boolean) | null): Promise<Task[] | void>;
    get(id: number): Task;
    create(task: TaskCreate, onCreateNotifyHandler: () => void): void;
    update(id: number, newTask: Task, onUpdteNotifyHandler: () => void): void;
    remove(id: number, onDeleteNotifyHandler: () => void): void;
}