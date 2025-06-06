import { sql } from "drizzle-orm";
import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
    id: varchar('id', { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    active: boolean('active').default(true).notNull(),
});
