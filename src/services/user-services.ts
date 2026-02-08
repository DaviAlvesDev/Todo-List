import { eq } from "drizzle-orm";
import { db } from "../db/index.js"
import { users } from "../db/schema.js";
import type { UsersSearchFilters, User, UpdateUserDTO } from "../types/users-types.js";
import { DeleteUserError, UpdateUserError, UserNotFoundError } from "../errors/user-errors.js";

export async function searchForUsers(filters: UsersSearchFilters = {}): Promise<User | User[]> {
    if (filters.id) {
        const user = await db
            .select().from(users)
            .where(eq(users.id, filters.id))

        if (!user[0]) throw new UserNotFoundError()

        return user[0]
    }

    if (filters.email) {
        const user = await db
            .select().from(users)
            .where(eq(users.email, filters.email))

        if (!user[0]) throw new UserNotFoundError()

        return user[0]
    }

    const allUsers = await db.select().from(users)
    return allUsers
}

export async function updateProfile(id: string, data: UpdateUserDTO): Promise<User> {
    const oldUser = await searchForUsers({ id }) as User
    if (!oldUser) throw new UserNotFoundError()

    const newUser = {
        name: data.name || oldUser.name,
        email: data.email || oldUser.email
    }

    const updatedUser = await db
        .update(users)
        .set({
            ...newUser
        })
        .where(eq(users.id, id))
        .returning()

    if (!updatedUser[0]) throw new UpdateUserError()

    return updatedUser[0]
}

export async function deleteProfile(id: string): Promise<User> {
    const oldUser = await searchForUsers({ id }) as User
    if (!oldUser) throw new UserNotFoundError()

    const deletedUser = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning()

    if (!deletedUser[0]) throw new DeleteUserError()

    return deletedUser[0]
}