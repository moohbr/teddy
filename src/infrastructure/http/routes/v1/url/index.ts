import { BaseRouter } from "@base/infrastructure/honojs/router";
import type { Context } from "hono";

export class UrlRouter extends BaseRouter {
  private static instance: UrlRouter;

  constructor() {
    super();
  }

  static getInstance(): UrlRouter {
    if (!UrlRouter.instance) {
      UrlRouter.instance = new UrlRouter();
    }
    return UrlRouter.instance;
  }

  protected setupRoutes(): void {
    this.setupCreateUrlRoute();
    this.setupGetAllByUserIdRoute();
    this.setupUpdateUrlRoute();
    this.setupDeleteUrlRoute();
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

  private setupGetAllByUserIdRoute(): void {
    const authMiddleware = this.container.get("AuthMiddleware");
    this.router.get(
      "/",
      authMiddleware.handle,
      this.handleGetAllByUserId.bind(this)
    );
  }

  private async handleGetAllByUserId(c: Context): Promise<Response> {
    const controller = this.container.get(
      "GetAllByUserIdController"
    );
    return await controller.handle(c);
  }

  private setupUpdateUrlRoute(): void {
    const authMiddleware = this.container.get("AuthMiddleware");
    this.router.put(
      "/:shortId",
      authMiddleware.handle,
      this.handleUpdateUrl.bind(this)
    );
  }

  private async handleUpdateUrl(c: Context): Promise<Response> {
    const controller = this.container.get(
      "UpdateUrlController"
    );
    return await controller.handle(c);
  }

  private setupDeleteUrlRoute(): void {
    const authMiddleware = this.container.get("AuthMiddleware");
    this.router.delete(
      "/:shortId",
      authMiddleware.handle,
      this.handleDeleteUrl.bind(this)
    );
  }

  private async handleDeleteUrl(c: Context): Promise<Response> {
    const controller = this.container.get(
      "DeleteUrlController"
    );
    return await controller.handle(c);
  }
}

export default UrlRouter.getInstance;
