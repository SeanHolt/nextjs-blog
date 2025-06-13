import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: t.int("id").primaryKey({ autoIncrement: true }),
  text: t.text("text").notNull(),
  done: t.int("done").default(0).notNull(),
});
export const users = sqliteTable("users", {
    id: t.int().primaryKey({ autoIncrement: true}),
    username: t.text().notNull(),
    email: t.text().notNull(),
    password: t.text().notNull()
})
export const blogs = sqliteTable("blogs", {
    id: t.int('id').primaryKey({ autoIncrement: true}),
    key: t.text("key").notNull().unique(),
    content: t.text("content").notNull(),
    date: t.text("date").notNull(),
    title: t.text("title").default("Some dummy title").notNull(),
    userId: t.int("user_id").references(() => users.id).notNull(),
})
