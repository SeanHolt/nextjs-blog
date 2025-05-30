import { db } from "../lib/db";
import { blogs } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getPostsList() {
    const posts = await db.select().from(blogs)
    return posts.map((row) => {
        return {
            id: row.key,
            date: row.date,
            contentHtml: row.content,
            userId: row.userId,
            key: row.key,
            title: row.key,
        }
    })
}
export async function getSortedPostsData() {
  // Get file names under /posts
  // Sort posts by date
  const allPostsData = await getPostsList();
  return allPostsData.sort((a, b) => {
    if (a.date && b.date && a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export async function getAllPostIds() {
    const posts = await db.select().from(blogs)
    return posts.map((row) => {
        return {
            params: {
                id: String(row.key)
            }
        }
    })
}
export async function getPostData(id) {
  const post = await db.select().from(blogs).where(eq(blogs.key, id));
  if (post && post.length > 0) {
    return {
      id: post[0].key,
      contentHtml: post[0].content,
      date: post[0].date,
    };
  }
  return {
    id: "-1",
    contentHtml: "Dummy filler content.",
    date: "2020-20-20"
  };
}
