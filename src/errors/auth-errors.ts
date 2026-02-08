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

export class UserNotLoggedError extends AppError {
    constructor() {
        super("The user is not logged", 401)
    }
}

export class UnauthorizedUserError extends AppError {
    constructor() {
        super("The user is unauthorized", 403)
    }
}