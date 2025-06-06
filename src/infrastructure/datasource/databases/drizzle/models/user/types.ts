import { usersTable } from './index';

export type UserSchema = typeof usersTable.$inferSelect;
export type InsertUserSchema = typeof usersTable.$inferInsert;
