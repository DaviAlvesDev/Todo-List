import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";
import { AuthApiError, AuthError } from "@supabase/supabase-js";

export function globalError(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        if (err.statusCode == 500) {
            console.error(`[${req.method}] ${req.url} - error: ${err.message}`)
            if (err.stack) console.error(err.stack)
        }
        return res.status(err.statusCode)
            .json({
                ok: false,
                msg: err.message
            })
    }

    if (err instanceof AuthError || err instanceof AuthApiError) {
        const statusCode = err.status && err.status >= 100 && err.status <= 600 ?
            err.status : 500

        if (statusCode >= 500) {
            console.error(`[${req.method}] ${req.url} - error: ${err}`)
            if (err.stack) console.error(err.stack)
        }

        return res.status(statusCode)
            .json({
                ok: false,
                msg: statusCode < 500 ? err.message : "Internal auth error"
            })
    }

    console.error(`[${req.method}] ${req.url} - error: ${err?.message}`)
    if (err.stack) console.error(err.stack)

    res.status(500)
        .json({
            ok: false,
            msg: "Internal server error"
        })
}