import { AppError } from "./app-error.js";

export class CreatingTaskError extends AppError {
    constructor() {
        super("An error occurred while creating your task, try again later", 500)
    }
}

export class UpdatingTaskError extends AppError {
    constructor() {
        super("An error occurred while updating your task, try again later", 500)
    }
}

export class DeletingTaskError extends AppError {
    constructor() {
        super("An error occurred while deleting your task, try again later", 500)
    }
}

export class TaskNotFoundError extends AppError {
    constructor() {
        super("This task doesn't exist or was already deleted", 404)
    }
}