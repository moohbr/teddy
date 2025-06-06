import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { schema } from './schema';

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pgPool, {
  schema,
  logger: true,
});
