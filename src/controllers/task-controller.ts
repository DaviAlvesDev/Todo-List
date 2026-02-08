import type { Request, Response } from "express"
import { UserNotLoggedError } from "../errors/auth-errors.js"
import * as taskServices from "../services/tasks-services.js"
import { AppError } from "../errors/app-error.js"
import type { CreateTaskDTO, UpdateTaskDTO } from "../types/tasks-types.js"

export async function viewMyTasks(req: Request, res: Response) {
    const id = req.headers['x-user-id']
    if (!id) throw new UserNotLoggedError()

    const tasks = await taskServices.viewTasks(String(id))

    res.json({
        ok: true,
        tasks
    })
}

export async function createNewTask(req: Request, res: Response) {
    const id = req.headers['x-user-id']
    if (!id) throw new UserNotLoggedError()

    const { title, description, dueDate } = req.body
    if (!title) throw new AppError("Please provide a 'title' to create a task", 400)

    const data: CreateTaskDTO = { title, description, dueDate, userID: String(id) }

    const newTask = await taskServices.createTask(String(id), data)

    res.json({
        ok: true,
        newTask
    })
}

export async function updateMyTask(req: Request, res: Response) {
    const userID = req.headers['x-user-id']
    if (!userID) throw new UserNotLoggedError()

    const { id } = req.params
    if (!id) throw new AppError("Provide an task ID", 400)
    const taskID = String(id)

    const { title, description, dueDate, done } = req.body

    const data: UpdateTaskDTO = { title, description, dueDate, done }

    const newTask = await taskServices.updateTask(String(userID), taskID, data)

    res.json({
        ok: true,
        newTask
    })
}

export async function deleteMyTask(req: Request, res: Response) {
    const userID = req.headers['x-user-id']
    if (!userID) throw new UserNotLoggedError()

    const { id } = req.params
    if (!id) throw new AppError("Provide an task ID", 400)
    const taskID = String(id)

    const deletedTask = await taskServices.deleteTask(String(userID), taskID)

    res.json({
        ok: true,
        deletedTask
    })
}