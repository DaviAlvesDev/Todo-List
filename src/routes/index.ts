import { Router } from "express"
import usersRouter from "./users.js"

const mainRouter = Router()

mainRouter.use("/users", usersRouter)

export default mainRouter