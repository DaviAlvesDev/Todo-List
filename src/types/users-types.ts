import type { users } from "../db/schema.js"

export type User = typeof users.$inferSelect

export type UsersSearchFilters = {
    id?: string,
    email?: string
}

export type UpdateUserDTO = {
    name?: string,
    email?: string
}