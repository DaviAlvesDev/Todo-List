import type { Request, Response } from "express"
import * as authServices from "../services/auth-services.js"
import { InvalidLoginUserDataError, InvalidRegisterUserDataError } from "../errors/auth-errors.js"

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body
    if (!name || !email || !password) throw new InvalidRegisterUserDataError()

    const user = await authServices.registerUser({ name, email, password })

    res.json({
        ok: true,
        ...user
    })
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) throw new InvalidLoginUserDataError()

    const user = await authServices.loginUser({ email, password })

    res.json({
        ok: true,
        ...user
    })
}
