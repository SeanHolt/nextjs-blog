'use server';
import { SignupFormSchema } from "./definitions";
import { db } from "./db";
import { users } from "../db/schema";
import { createSession, deleteSession } from "./session";
import bcrypt from 'bcrypt'

export async function signup(formData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Call the provider or db to create a user...
    // 2. Prepare data for insertion into database
    const { name, email, password } = validatedFields.data;
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert the user into the database or call an Library API
    const data = await db
        .insert(users)
        .values({
            name,
            email,
            password: hashedPassword,
        })
        .returning({ id: users.id });
        console.log("data = ", data)
    const user = data[0];
    console.log("user = ", user)
    if (!user) {
        return {
            message: "An error occurred while creating your account.",
        };
    }
    // 4. Create user session
    await createSession(user.id);
    // 5. Redirect user
    redirect("/");
}
export async function logout() {
    await deleteSession();
    redirect("/auth/login");
}
