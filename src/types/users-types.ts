import type { users } from "../db/schema.js"

export type User = typeof users.$inferSelect

export type LoggedUser = {
    email: string,
    access_token: string,
    refresh_token: string
}

export type InsertUserDTO = typeof users.$inferInsert

export type UsersSearchFilters = {
    id?: string,
    email?: string
}

export type RegisterUserDTO = {
    name: string,
    email: string,
    password: string
}

export type LoginUserDTO = {
    email: string,
    password: string
}

export type UpdateUserDTO = {
    name?: string,
    email?: string
}