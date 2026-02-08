import { Router } from "express"
import { deleteUser, getUsers } from "../controllers/admin-controller.js"

const adminRouter = Router()

adminRouter.post("/users", getUsers)

adminRouter.delete("/users/:id", deleteUser)

export default adminRouter