import { sql } from "drizzle-orm";

import {
  bigint,
  int,
  text,
  singlestoreTable,
  datetime,
  index,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `my-bucket_${name}`,
);

export const files = createTable(
  "files_table",
  {
    id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: int("url").notNull(),
    parent: bigint("parent", {mode: "number", unsigned: true}),
    mimeType: text("mime_type"),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export const folders = createTable(
  "folders_table",
  {
    id: bigint("id", {mode: "number", unsigned: true}).primaryKey().autoincrement(),
    name: text("name"),
    parent: bigint("parent", {mode: "number", unsigned: true}),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);
