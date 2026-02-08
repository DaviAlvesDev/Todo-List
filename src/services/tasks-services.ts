import { and, eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { tasks } from "../db/schema.js"
import type { CreateTaskDTO, Task, UpdateTaskDTO } from "../types/tasks-types.js"
import { CreatingTaskError, TaskNotFoundError, UpdatingTaskError } from "../errors/task-errors.js"

export async function viewTasks(userID: string): Promise<Task[]> {
    const result = await db
        .select().from(tasks)
        .where(eq(tasks.userID, userID))

    return result
}

export async function createTask(userID: string, task: CreateTaskDTO): Promise<Task> {
    const createdTask = await db
        .insert(tasks).values({
            ...task
        }).returning()

    if (!createdTask[0]) throw new CreatingTaskError()

    return createdTask[0]
}

export async function updateTask(userID: string, taskID: string, newData: UpdateTaskDTO): Promise<Task> {
    const oldTask = await db.select().from(tasks).where(eq(tasks.id, taskID))
    if (!oldTask[0]) throw new TaskNotFoundError()

    const newTaskData = {
        title: newData.title || oldTask[0].title,
        description: newData.description || oldTask[0].description,
        done: newData.done || oldTask[0].done,
        dueDate: newData.dueDate || oldTask[0].dueDate
    }

    const newTask = await db
        .update(tasks)
        .set({
            ...newTaskData
        }).where(and(
            eq(tasks.id, taskID),
            eq(tasks.userID, userID)
        )).returning()

    if (!newTask[0]) throw new UpdatingTaskError()

    return newTask[0]
}

export async function deleteTask(userID: string, taskID: string): Promise<Task> {
    const oldTask = await db.select().from(tasks).where(eq(tasks.id, taskID))
    if (!oldTask[0]) throw new TaskNotFoundError()

    const deletedTask = await db
        .delete(tasks)
        .where(
            and(
                eq(tasks.id, taskID),
                eq(tasks.userID, userID)
            )
        ).returning()

    if (!deletedTask[0]) throw new UpdatingTaskError()

    return deletedTask[0]
}