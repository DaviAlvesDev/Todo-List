import type { Request, Response } from "express"
import { AppError } from "../errors/app-error.js"
import * as userServices from "../services/user-services.js"

export async function getUsers(req: Request, res: Response) {
    const { id, email } = req.body

    const users = await userServices.searchForUsers({ id, email })

    res.json({
        ok: true,
        ...users
    })
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params
    if (!id) throw new AppError("Provide an 'id' to delete a user", 400)

    const deletedUser = await userServices.deleteProfile(String(id))

    res.json({
        ok: true,
        ...deletedUser
    })
}