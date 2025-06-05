import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { AppSchema } from "./schema/types";

export type DatabaseType = NodePgDatabase<AppSchema>;
