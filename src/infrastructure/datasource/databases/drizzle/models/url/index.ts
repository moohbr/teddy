import { pgTable, varchar, timestamp, integer, index, boolean } from 'drizzle-orm/pg-core';

import { usersTable } from '../user';

export const urlsTable = pgTable(
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
