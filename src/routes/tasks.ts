import { Router } from "express"
import { createNewTask, deleteMyTask, updateMyTask, viewMyTasks } from "../controllers/task-controller.js"

const tasksRouter = Router()

tasksRouter.get("/", viewMyTasks)

tasksRouter.post("/", createNewTask)

tasksRouter.patch("/:id", updateMyTask)

tasksRouter.delete("/:id", deleteMyTask)

export default tasksRouter