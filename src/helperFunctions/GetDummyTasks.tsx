import { Task } from "../models/Task";


export function getDummyTasks(): Task[]{
    return [
        {
            id: 1,
            taskTitle: "Task1",
            additionalDescription: "Lorem Ipsun dolores...",
            taskStartTime: "11.11.1111",
            taskEndTime: "22.22.2222",
            status: "to-do",
            type: "feature",
        },
        {
            id: 2,
            taskTitle: "Task2",
            additionalDescription: "Lorem Ipsun dolores...",
            taskStartTime: "11.11.1111",
            taskEndTime: "22.22.2222",
            status: "to-do",
            type: "bug",
        },
        {
            id: 3,
            taskTitle: "Task3",
            additionalDescription: "Lorem Ipsun dolores...",
            taskStartTime: "11.11.1111",
            taskEndTime: "22.22.2222",
            status: "in-progress",
            type: "bug",
        },
        {
            id: 4,
            taskTitle: "Task4",
            additionalDescription: "Lorem Ipsun dolores...",
            taskStartTime: "11.11.1111",
            taskEndTime: "22.22.2222",
            status: "in-progress",
            type: "feature",
        },
        {
            id: 5,
            taskTitle: "Task5",
            additionalDescription: "Lorem Ipsun dolores...",
            taskStartTime: "11.11.1111",
            taskEndTime: "22.22.2222",
            status: "done",
            type: "feature",
        },
    ]
}

export function getDefaultTask(): Task
{
    return {
        id: 0,
        taskTitle: "sdfsdfsd",
        additionalDescription: "",
        taskStartTime: "2023-02-18T14:54:28.555Z",
        taskEndTime: "2023-02-19T14:54:28.555Z",
        status: "to-do",
        type: "feature",
    }
}

