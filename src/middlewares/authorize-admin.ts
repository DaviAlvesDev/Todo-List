import type { NextFunction, Request, Response } from "express"
import { UnauthorizedUserError, UserNotLoggedError } from "../errors/auth-errors.js"

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const role = req.headers['x-user-role']
    if (!role) throw new UserNotLoggedError()

    if (role !== "admin") throw new UnauthorizedUserError()

    next()
}