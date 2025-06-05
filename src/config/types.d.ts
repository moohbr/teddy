import { z } from "zod";
import { ConfigSchemas } from "./schemas";

declare global {
  namespace NodeJS {
    // @ts-expect-error ProcessEnv always will be Record<string, string | string[] | undefined>
    interface ProcessEnv extends z.infer<typeof ConfigSchemas.envSchema> {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      APP_PORT: number;
      APP_HOST: string;
    }
  }
}