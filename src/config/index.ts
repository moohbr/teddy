import { ValidationError } from '@base/errors/validation-error';
import { logger } from '@infrastructure/logger';

import { ConfigSchemas } from './schemas';

const result = new ConfigSchemas().envSchema.safeParse(process.env);

if (!result.success) {
  throw new ValidationError(
    'Invalid environment variables: ' + JSON.stringify(result.error?.format(), null, 2),
  );
} else {
  logger.info('Environment variables are valid');
}

Object.entries(result.data).forEach(([key, value]) => {
  if (value !== undefined) {
    process.env[key] = String(value);
  }
});
