import type { NextFunction, Request, Response } from "express";
import { AuthorizationError, InvalidTokenError } from "../errors/auth-errors.js";
import { supabase } from "../lib/supabase.js";
import { searchForUsers } from "../services/user-services.js";
import type { User } from "../types/users-types.js";


export async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) throw new InvalidTokenError()

    const { data, error } = await supabase.auth.getUser(token)
    if (error) throw error
    if (!data.user) throw new AuthorizationError()

    const { role } = await searchForUsers({ id: data.user.id }) as User

    req.headers['x-user-id'] = data.user.id
    req.headers['x-user-role'] = role || "user"

    next()
}