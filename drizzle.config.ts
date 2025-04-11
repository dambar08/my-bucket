import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    host: env.DATABASE_HOST as string,
    port: Number(env.DATABASE_PORT),
    user: env.DATABASE_USERNAME as string,
    password: env.DATABASE_PASSWORD as string,
    database: env.DATABASE_NAME as string,
    url: env.DATABASE_URL,
    ssl: {}
  },
  tablesFilter: ["my-bucket_*"],
} satisfies Config;
