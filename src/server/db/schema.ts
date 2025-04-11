import { sql } from "drizzle-orm";

import { int, text, singlestoreTable, datetime } from "drizzle-orm/singlestore-core";

export const post = singlestoreTable("posts_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
  createdAt: datetime()
});

export const user = singlestoreTable("users_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});
