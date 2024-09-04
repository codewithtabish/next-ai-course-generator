import { defineConfig } from "drizzle-kit";
// @ts-ignore
export default defineConfig({
  schema: "./src/config/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:UfiBlEI8m9Kj@ep-young-glade-a5g256v3.us-east-2.aws.neon.tech/course-generator?sslmode=require",
  },
  verbose: true,
  strict: true,
});
