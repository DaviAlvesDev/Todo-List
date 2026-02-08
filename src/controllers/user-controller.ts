import type { Request, Response } from "express";
import * as userServices from "../services/user-services.js"
import { UserNotLoggedError } from "../errors/auth-errors.js";
import type { User } from "../types/users-types.js";
import { InvalidUpdateUserDataError } from "../errors/user-errors.js";

export async function getMyProfile(req: Request, res: Response) {
    const id = req.headers['x-user-id']
    if (!id) throw new UserNotLoggedError()

    const profile = await userServices.searchForUsers({ id: String(id) }) as User

    res.json({
        ok: true,
        ...profile
    })
}

export async function updateMyProfile(req: Request, res: Response) {
    const id = req.headers['x-user-id']
    if (!id) throw new UserNotLoggedError()

    const { name, email } = req.body
    if (!name && !email) throw new InvalidUpdateUserDataError()

    const profile = await userServices.updateProfile(String(id), { name, email })

    res.json({
        ok: true,
        ...profile
    })
}

export async function deleteMyAccount(req: Request, res: Response) {
    const id = req.headers['x-user-id']
    if (!id) throw new UserNotLoggedError()

    const profile = await userServices.deleteProfile(String(id))

    res.json({
        ok: true,
        ...profile
    })
}
