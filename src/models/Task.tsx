export type Task = {
    id: number;
    taskTitle: string;
    additionalDescription: string;
    taskStartTime: string;
    taskEndTime: string;
    status: "to-do" | "in-progress" | "done";
    type: "feature" | "bug";
}

export type TaskCreate = {
    taskTitle: string;
    additionalDescription: string;
    taskStartTime: string;
    taskEndTime: string;
    status: "to-do" | "in-progress" | "done";
    type: "feature" | "bug";
}