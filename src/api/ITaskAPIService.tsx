import { Task, TaskCreate } from "../models/Task";


export default interface ITaskAPIService{
    getAll(filter: ((task: Task) => boolean) | null): Promise<Task[] | void>;
    get(id: number): Task;
    create(task: TaskCreate): void;
    update(id: number, newTask: Task): void;
    remove(id: number): void;
}