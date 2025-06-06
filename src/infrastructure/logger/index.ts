import winston from 'winston';

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack, ...meta } = info;

    const levelColors: Record<string, string> = {
      error: '\x1b[31m', // red
      warn: '\x1b[33m', // yellow
      info: '\x1b[32m', // green
      debug: '\x1b[36m', // cyan
      verbose: '\x1b[35m', // magenta
    };

    const resetColor = '\x1b[0m';
    const levelColor = levelColors[level] || '';

    let logMessage = `${timestamp} [${levelColor}${level.toUpperCase()}${resetColor}]: ${message}`;

    if (stack) {
      logMessage += `\n${stack}`;
    }

    const excludeFields = ['timestamp', 'level', 'message', 'stack'];
    const filteredMeta = Object.keys(meta)
      .filter((key) => !excludeFields.includes(key))
      .reduce(
        (obj, key) => {
          obj[key] = meta[key];
          return obj;
        },
        {} as Record<string, unknown>,
      );

    const metaKeys = Object.keys(filteredMeta);
    if (metaKeys.length > 0) {
      const metaString = JSON.stringify(filteredMeta, null, 2);
      logMessage += `\n${metaString}`;
    }

    return logMessage;
  }),
);

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? 'warn' : 'debug'),
  defaultMeta: {
    service: 'url-shortener',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
  exitOnError: false,
});

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim(), { component: 'http' });
  },
};

export const logWithContext = {
  database: (message: string, meta?: object) => {
    logger.info(message, { component: 'database', ...meta });
  },

  server: (message: string, meta?: object) => {
    logger.info(message, { component: 'server', ...meta });
  },

  auth: (message: string, meta?: object) => {
    logger.info(message, { component: 'auth', ...meta });
  },

  api: (message: string, meta?: object) => {
    logger.info(message, { component: 'api', ...meta });
  },

  error: (message: string, error?: Error, meta?: object) => {
    logger.error(message, {
      error: error?.message,
      stack: error?.stack,
      ...meta,
    });
  },
};
