import type { tasks } from "../db/schema.js"

export type Task = typeof tasks.$inferSelect

export type CreateTaskDTO = typeof tasks.$inferInsert

export type UpdateTaskDTO = {
    title?: string,
    description?: string,
    dueDate?: Date
}