import { sql } from 'drizzle-orm';
import { pgTable, varchar, timestamp, boolean, integer, index } from 'drizzle-orm/pg-core';

export const urls = pgTable(
  'urls',
  {
    shortId: varchar('short_id', { length: 6 }).primaryKey().notNull(),
    originalUrl: varchar('original_url', { length: 2048 }).notNull(),
    count: integer('count').notNull().default(0),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
    userId: varchar('user_id').references(() => usersTable.id),
    active: boolean('active').default(true).notNull(),
  },
  (table) => [
    index('idx_urls_short_id').on(table.shortId),
    index('idx_urls_original_url').on(table.originalUrl),
    index('idx_urls_user_id').on(table.userId),
  ],
);

export const usersTable = pgTable(
  'users',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    active: boolean('active').default(true).notNull(),
  },
  (table) => [index('idx_users_email').on(table.email), index('idx_users_name').on(table.name)],
);
