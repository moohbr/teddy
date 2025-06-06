import { Hono } from 'hono';

import { DIContainer } from '@infrastructure/di';
import { AuthMiddleware } from '@infrastructure/http/middlewares/auth';

export abstract class BaseRouter {
  protected router: Hono;
  protected container: DIContainer;
  protected authMiddleware: AuthMiddleware;

  constructor() {
    this.router = new Hono();
    this.container = DIContainer.getInstance();
    this.authMiddleware = this.container.get('AuthMiddleware');
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
