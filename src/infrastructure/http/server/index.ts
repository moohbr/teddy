import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { db } from '@infrastructure/datasource/databases/drizzle';
import { DIContainer } from '@infrastructure/di';
import { logger as winston } from '@infrastructure/logger';

import { V1Router } from '../routes/v1';
import { swaggerConfig } from '../swagger';
import type { IServer } from './interfaces';

export class Server implements IServer {
  public readonly app: Hono;
  private readonly config: ServerConfig;
  private readonly container: DIContainer;

  constructor(config: ServerConfig) {
    this.config = config;
    this.app = new Hono();
    this.container = DIContainer.getInstance();
  }

  public async start(): Promise<void> {
    db.$client.connect();
    this.setupMiddlewares();
    this.setupRoutes();
    serve({ fetch: this.app.fetch, port: this.config.port, hostname: this.config.address });
    winston.info(`Server started at http://${this.config.address}:${this.config.port}`);
    winston.info(`Swagger UI available at http://${this.config.address}:${this.config.port}/docs`);
  }

  private setupMiddlewares(): void {
    this.app.use('*', logger());

    this.app.notFound((c) => {
      return c.json({ message: 'Not Found' }, 404);
    });

    this.app.onError((err, c) => {
      winston.error('Unhandled error:', err);
      return c.json({ message: 'Internal Server Error' }, 500);
    });
  }
  private setupRoutes(): void {
    this.app.use('/docs', swaggerUI({ url: '/docs/swagger.json' }));
    this.app.get('/docs/swagger.json', (c) => {
      return c.json(swaggerConfig);
    });

    V1Router.getInstance().registerWith(this.app, '/v1');
    this.app.get('/:shortId', async (c) => {
      const controller = this.container.get('RedirectUrlController');
      return await controller.handle(c);
    });
  }
}
