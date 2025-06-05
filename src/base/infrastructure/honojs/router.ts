import { DIContainer } from "@infrastructure/di";
import { Hono } from "hono";

export abstract class BaseRouter {
  protected router: Hono;
  protected container: DIContainer;

  constructor() {
    this.router = new Hono();
    this.container = DIContainer.getInstance();
    this.setupRoutes();
  }

  protected abstract setupRoutes(): void;

  public getRouter(): Hono {
    return this.router;
  }

  public registerWith(app: Hono, path?: string): void {
    if (path) {
      app.route(path, this.router);
    } else {
      app.route('/', this.router);
    }
  }
}
