import { eq } from "drizzle-orm";
import { db } from "../db/index.js"
import { users } from "../db/schema.js";
import type { UsersSearchFilters, User, UpdateUserDTO } from "../types/users-types.js";
import { DeleteUserError, UpdateUserError, UserNotFoundError } from "../errors/user-errors.js";
import { supabase } from "../lib/supabase.js";

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

export async function updateProfile(id: string, Userdata: UpdateUserDTO): Promise<User> {
    const oldUser = await searchForUsers({ id }) as User
    if (!oldUser) throw new UserNotFoundError()

    const newUser = {
        name: Userdata.name || oldUser.name,
        email: Userdata.email || oldUser.email
    }

    const updatedUser = await db
        .update(users)
        .set({
            ...newUser
        })
        .where(eq(users.id, id))
        .returning()

    if (!updatedUser[0]) throw new UpdateUserError()

    const { error } = await supabase.auth.admin.updateUserById(
        id,
        { email: newUser.email }
    )
    if (error) {
        await db.update(users).set({ email: oldUser.email }).where(eq(users.id, id))
        throw error
    }

    return updatedUser[0]
}

export async function deleteProfile(id: string): Promise<User> {
    const oldUser = await searchForUsers({ id }) as User
    if (!oldUser) throw new UserNotFoundError()

    const { error } = await supabase.auth.admin.deleteUser(id)
    if (error) throw error

    const deletedUser = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning()

    if (!deletedUser[0]) throw new DeleteUserError()


    return deletedUser[0]
}