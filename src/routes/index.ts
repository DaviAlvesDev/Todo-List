import { Router } from "express"
import usersRouter from "./users.js"
import { auth } from "../middlewares/auth.js"
import authRouter from "./auth.js"
import adminRouter from "./admin.js"
import { authorizeAdmin } from "../middlewares/authorize-admin.js"

const mainRouter = Router()

mainRouter.use("/users", auth, usersRouter)

mainRouter.use("/auth", authRouter)

mainRouter.use("/admin", auth, authorizeAdmin, adminRouter)

export default mainRouter