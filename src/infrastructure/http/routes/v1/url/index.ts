import { BaseRouter } from "@base/infrastructure/honojs/router";
import { AuthMiddleware } from "@infrastructure/http/middlewares/auth";
import type { Context } from "hono";

export class UrlRouter extends BaseRouter {
  private static instance: UrlRouter;
  private readonly authMiddleware: AuthMiddleware;

  constructor() {
    super();
    this.authMiddleware = this.container.get("AuthMiddleware");
    this.setupRoutes();
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
      this.authMiddleware.handle,
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
    this.router.get(
      "/",
      this.authMiddleware.handle,
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
    this.router.put(
      "/:shortId",
      this.authMiddleware.handle,
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
    this.router.delete(
      "/:shortId",
      this.authMiddleware.handle,
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
