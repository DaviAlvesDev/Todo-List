import { Router } from "express"
import usersRouter from "./users.js"
import { auth } from "../middlewares/auth.js"
import authRouter from "./auth.js"

const mainRouter = Router()

mainRouter.use("/users", auth, usersRouter)

mainRouter.use("/auth", authRouter)

export default mainRouter