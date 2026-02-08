import { AppError } from "./app-error.js"

export class InvalidTokenError extends AppError {
    constructor() {
        super("The token is invalid or was not sended", 401)
    }
}

export class AuthorizationError extends AppError {
    constructor() {
        super("An error occured while validating the token, try again later", 500)
    }
}