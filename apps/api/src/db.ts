import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./env";
import * as schema from "@myet/db";

const isRemoteOrProd =
  process.env.NODE_ENV === "production" ||
  env.DATABASE_URL.includes("sslmode=require") ||
  env.DATABASE_URL.includes("supabase") ||
  env.DATABASE_URL.includes("neon.tech");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ...(isRemoteOrProd ? { ssl: { rejectUnauthorized: false } } : {})
});

export const db = drizzle(pool, { schema });
export { pool };
