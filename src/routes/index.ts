import { Router } from "express"
import usersRouter from "./users.js"
import { auth } from "../middlewares/auth.js"

const mainRouter = Router()

mainRouter.use("/users", auth, usersRouter)

export default mainRouter