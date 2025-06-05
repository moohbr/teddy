import { BaseRouter } from "@base/infrastructure/honojs/router";
import type { Context } from "hono";

export class UrlRouter extends BaseRouter {
  private static instance: UrlRouter;

  static getInstance(): UrlRouter {
    if (!UrlRouter.instance) {
      UrlRouter.instance = new UrlRouter();
    }
    return UrlRouter.instance;
  }

  protected setupRoutes(): void {
    this.setupCreateUrlRoute();
  }

  private setupCreateUrlRoute(): void {
    this.router.post(
      "/",
      this.handleCreateUrl.bind(this)
    );
  }

  private async handleCreateUrl(c: Context): Promise<Response> {
    const controller = this.container.get(
      "CreateUrlController"
    );
    return await controller.handle(c);
  }
}

export default UrlRouter.getInstance;
