import { sql } from "drizzle-orm";

import {
  bigint,
  int,
  text,
  singlestoreTable,
  datetime,
  timestamp,
  index,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `my-bucket_${name}`,
);

export const users_table = createTable(
  "users_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    email: text("email"),
    firstname: text("firstname"),
    lastname: text("lastname"),
    imageUrl: text("image_url"),
    clerkUserId: text("clerk_user_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()), 
  },
  (t) => {
    return [index("clerk_user_id_index").on(t.clerkUserId),
      index("email_index").on(t.email)
    ];
  },
);

export type DB_UserType = typeof users_table.$inferSelect;

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    mimeType: text("mime_type"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()), 
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export type DB_FileType = typeof files_table.$inferSelect;

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name"),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()), 
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export type DB_FolderType = typeof folders_table.$inferSelect;