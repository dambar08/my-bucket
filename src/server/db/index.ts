import { drizzle } from "drizzle-orm/singlestore";

import { env } from "@/env";
import * as schema from "./schema";
import mysql, { createPool, type Pool } from "mysql2/promise";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};


if (!env.DATABASE_HOST || !env.DATABASE_PORT || !env.DATABASE_USERNAME || !env.DATABASE_PASSWORD || !env.DATABASE_NAME) {
  throw new Error(
    "Missing one or more required environment variables: DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME."
  );
}

export const conn =
  globalForDb.conn ??
  mysql.createPool({
    host: env.DATABASE_HOST as string,
    port: Number(env.DATABASE_PORT),
    user: env.DATABASE_USERNAME as string,
    password: env.DATABASE_PASSWORD as string,
    database: env.DATABASE_NAME as string,
    ssl: {},
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle({ client: conn });
