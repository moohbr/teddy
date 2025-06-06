import { Hono } from "hono";
import { serve } from '@hono/node-server'
import type { IServer } from "./interfaces";
import { V1Router } from "../routes/v1";
import { logger } from "hono/logger";
import { logger as winston } from "@infrastructure/logger";
import { DIContainer } from "@infrastructure/di";
import { db } from "@infrastructure/datasource/databases/drizzle";

export class Server implements IServer {
  public readonly app: Hono;
  private readonly config: ServerConfig;
  private readonly container: DIContainer;

  constructor(config: ServerConfig) {
    this.config = config;
    this.app = new Hono()
    this.container = DIContainer.getInstance();
  }

  public async start(): Promise<void> {
    db.$client.connect()
    this.setupMiddlewares();
    this.setupRoutes();
    serve({ fetch: this.app.fetch, port: this.config.port, hostname: this.config.address })
    winston.info(`Server started at http://${this.config.address}:${this.config.port}`);
  }

  private setupMiddlewares(): void {
    this.app.use('*', logger())

    this.app.notFound((c) => {
      return c.json({ message: 'Not Found' }, 404)
    })

    this.app.onError((err, c) => {
      winston.error('Unhandled error:', err)
      return c.json({ message: 'Internal Server Error' }, 500)
    })

  }
  private setupRoutes(): void {
    V1Router.getInstance().registerWith(this.app, "/v1");
    this.app.get('/:shortId', async (c) => {
      const controller = this.container.get("RedirectUrlController");
      return await controller.handle(c);
    });
  }
}
