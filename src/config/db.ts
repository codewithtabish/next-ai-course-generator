import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(
  process.env.NEXT_PUBLIC_DB_CONNECTION_STRING! ||
    "postgresql://neondb_owner:UfiBlEI8m9Kj@ep-young-glade-a5g256v3.us-east-2.aws.neon.tech/course-generator?sslmode=require"
);
export const db = drizzle(sql);
