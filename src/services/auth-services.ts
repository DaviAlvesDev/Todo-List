import { db } from "../db/index.js"
import { users } from "../db/schema.js"
import { LoginUserError, RegisterUserError } from "../errors/user-errors.js"
import { supabase } from "../lib/supabase.js"
import type { InsertUserDTO, LoggedUser, LoginUserDTO, RegisterUserDTO, User } from "../types/users-types.js"

export async function registerUser(Userdata: RegisterUserDTO): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
        email: Userdata.email,
        password: Userdata.password
    })

    if (error) throw error
    if (!data.user) throw new RegisterUserError()

    const newUser: InsertUserDTO = {
        id: data.user.id,
        name: Userdata.name,
        email: data.user.email!
    }

    try {
        const result = await db
            .insert(users).values({
                ...newUser
            }).returning()

        if (!result[0]) throw new RegisterUserError()

        return result[0]
    } catch (dbError) {
        await supabase.auth.admin.deleteUser(data.user.id)
        throw dbError
    }
}

export async function loginUser(Userdata: LoginUserDTO): Promise<LoggedUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
        ...Userdata
    })

    if (error) throw error
    if (!data.session || !data.user) throw new LoginUserError()

    const userSession: LoggedUser = {
        email: data.user.email!,
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
    }

    return userSession
}