import { urlsTable } from '.';

export type UrlSchema = typeof urlsTable.$inferSelect;
export type InsertUrlSchema = typeof urlsTable.$inferInsert;
