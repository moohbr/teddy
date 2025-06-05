import "config"
import { defineConfig } from 'drizzle-kit';
import { schema } from './src/infrastructure/datasource/databases/drizzle/schema';

console.log(Object.keys(schema));

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
