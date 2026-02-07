import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";

export function globalError(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        if (err.statusCode == 500) {
            console.error(`[${req.method}] ${req.url} - error: ${err}`)
        }
        return res.status(err.statusCode)
            .json({
                ok: false,
                msg: err.message
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