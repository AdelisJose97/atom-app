import { Task } from "./interface";

const TASKS_MOCK: Task[] = [
    {
        id: crypto.randomUUID(),
        createdAt: Date.now().toString(),
        title: "Tarea 1",
        description: "Descripcion de la tarea 1",
        isDone: false
    },
    {
        id: crypto.randomUUID(),
        createdAt: Date.now().toString(),
        title: "Tarea 2",
        description: "Descripcion de la tarea 2",
        isDone: false
    },
    {
        id: crypto.randomUUID(),
        createdAt: Date.now().toString(),
        title: "Tarea 3",
        description: "Descripcion de la tarea 3",
        isDone: false
    },
    {
        id: crypto.randomUUID(),
        createdAt: Date.now().toString(),
        title: "Tarea 4",
        description: "Descripcion de la tarea 4",
        isDone: false
    }
];

export default TASKS_MOCK;
