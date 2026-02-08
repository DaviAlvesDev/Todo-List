import { supabase } from "../../lib/supabase.js"
import type { InsertUserDTO } from "../../types/users-types.js"
import { db } from "../index.js"
import 'dotenv/config'
import { users } from "../schema.js"

const { data, error } = await supabase.auth.signUp({
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!
})

if (error) throw error
if (!data.user) throw new Error("Error while creating admin")

const admin: InsertUserDTO = {
    id: data.user.id,
    name: "Admin user",
    email: data.user.email!,
    role: "admin"
}

try {
    await db.insert(users).values({
        ...admin
    })
    console.log("Success: Admin user created!")
} catch (dbError) {
    await supabase.auth.admin.deleteUser(data.user.id)
    throw dbError
}