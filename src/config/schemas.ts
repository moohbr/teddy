import { z } from "zod";
import { NODE_ENV } from "./enums";

export class ConfigSchemas {
  public readonly envSchema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL must be a valid URL"),
    APP_PORT: z.coerce.number().default(8080),
    APP_HOST: z.string().optional().default("0.0.0.0"),
    NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEV),
    JWT_SECRET: z.string().min(1, "JWT_SECRET must be a valid secret").default("secret"),
    JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN must be a valid duration").default("1h"),
  });
}
