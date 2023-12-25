import { Task } from "../models/Task";


export function getDummyTasks(): Task[]{
    return [
        {
            id: 1,
            title: "Task1",
            description: "Lorem Ipsun dolores...",
            startDate: "11.11.1111",
            endDate: "22.22.2222",
            status: "to-do",
            type: "feature",
        },
        {
            id: 2,
            title: "Task2",
            description: "Lorem Ipsun dolores...",
            startDate: "11.11.1111",
            endDate: "22.22.2222",
            status: "to-do",
            type: "bug",
        },
        {
            id: 3,
            title: "Task3",
            description: "Lorem Ipsun dolores...",
            startDate: "11.11.1111",
            endDate: "22.22.2222",
            status: "in-progress",
            type: "bug",
        },
        {
            id: 4,
            title: "Task4",
            description: "Lorem Ipsun dolores...",
            startDate: "11.11.1111",
            endDate: "22.22.2222",
            status: "in-progress",
            type: "feature",
        },
        {
            id: 5,
            title: "Task5",
            description: "Lorem Ipsun dolores...",
            startDate: "11.11.1111",
            endDate: "22.22.2222",
            status: "done",
            type: "feature",
        },
    ]
}