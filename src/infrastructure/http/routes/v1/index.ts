import { BaseRouter } from '@base/infrastructure/honojs/router';

import { UrlRouter } from './url';
import { UserRouter } from './user';

export class V1Router extends BaseRouter {
  private static instance: V1Router;

  static getInstance(): V1Router {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router();
    }
    return V1Router.instance;
  }

  private constructor() {
    super();
  }

  protected setupRoutes(): void {
    this.router.route('/url', UrlRouter.getInstance().getRouter());
    this.router.route('/user', UserRouter.getInstance().getRouter());
  }
}
