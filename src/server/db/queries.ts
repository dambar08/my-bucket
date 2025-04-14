import { eq, or } from "drizzle-orm";
import { db } from ".";
import {
  files_table,
  users_table,
  type DB_FileType,
  type DB_UserType,
} from "./schema";

export const QUERIES = {
  getUserById: async function (id?: number, clerkUserId?: string) {
    if (!id && !clerkUserId) {
      throw new Error("id or clerkUserId must be provided");
    }
    const query = id
      ? eq(users_table.id, id)
      : eq(users_table.clerkUserId, clerkUserId!);
    return await db.select().from(users_table).where(query).limit(1);
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(files_table).values(input.file);
  },
  createUser: async (
    user: Pick<DB_UserType, "clerkUserId" | "firstname" | "lastname" | "email">,
  ) => {
    return await db.insert(users_table).values(user);
  },
  deleteUser: async function (userId: number) {
    return await db.delete(users_table).where(eq(users_table.id, userId));
  },
  updateUser: async function (userId: number, data: Partial<DB_UserType>) {
    return await db
      .update(users_table)
      .set(data)
      .where(eq(users_table.id, userId));
  },
};
