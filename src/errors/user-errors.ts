import { AppError } from "./app-error.js"

export class UserNotFoundError extends AppError {
    constructor() {
        super("The user doesn't exist or was already deleted", 404)
    }
}

export class RegisterUserError extends AppError {
    constructor() {
        super("An error occured while registering the user data, try again later", 500)
    }
}

export class LoginUserError extends AppError {
    constructor() {
        super("An error occured while loging in, try again later", 500)
    }
}

export class UpdateUserError extends AppError {
    constructor() {
        super("An error occured while updating the user data, try again later", 500)
    }
}

export class DeleteUserError extends AppError {
    constructor() {
        super("An error occured while deleting the user data, try again later", 500)
    }
}