"use server";

import { z } from "zod";
import { db } from "./db";
import { blogs } from "../db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const _CreatePostSchema = z.object({
  id: z.number({ message: "ID is required." }),
  title: z
    .string({ message: "Title is required." })
    .min(10, "Title must be at least 10 characters."),
  key: z.string({ message: "Key is required." }),
  content: z.string({ message: "Content is required." }),
  date: z.string({ message: "Date is required." }),
  userId: z.number({ message: "userId is required." }),
});
const CreatePostSchema = _CreatePostSchema.omit({
  id: true,
});

export async function createPostForm(state, formData) {
  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get("title"),
    key: formData.get("key"),
    content: formData.get("content"),
    date: "2025-10-01",
    userId: 1,
  });
  if (!validatedFields.success) {
    const data = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create post.",
      values: {
        title: formData.get("title"),
        key: formData.get("key"),
        content: formData.get("content"),
      },
    };
    console.log("data = ", data);
    return data;
  }
  const { userId, date, title, key, content } = validatedFields.data;
  const values = { userId, date, title, key, content };
  try {
    await db.insert(blogs).values(values).execute();
    revalidatePath("/");
  } catch (error) {
    console.log("error = ", error);
    return {
      errors: {},
      message: "Failed to create post. Database error: " + error.toString(),
      values,
    };
  }
  //redirect("/");
}
