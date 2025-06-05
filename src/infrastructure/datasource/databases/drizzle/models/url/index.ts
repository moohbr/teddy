import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const urlsTable = pgTable("urls", {
  shortId: varchar("short_id", { length: 6 }).primaryKey(),
  originalUrl: varchar("original_url", { length: 2048 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
