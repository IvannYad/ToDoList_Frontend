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