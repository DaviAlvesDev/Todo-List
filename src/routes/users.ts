import { Router } from "express"
import { deleteMyAccount, getMyProfile, updateMyProfile } from "../controllers/user-controller.js"

const usersRouter = Router()

usersRouter.get("/profile", getMyProfile)

usersRouter.patch("/profile", updateMyProfile)

usersRouter.delete("/profile", deleteMyAccount)

export default usersRouter