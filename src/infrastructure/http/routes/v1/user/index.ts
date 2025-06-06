import { BaseRouter } from "@base/infrastructure/honojs/router";
import type { Context } from "hono";

export class UserRouter extends BaseRouter {
  private static instance: UserRouter;

  static getInstance(): UserRouter {
    if (!UserRouter.instance) {
      UserRouter.instance = new UserRouter();
    }
    return UserRouter.instance;
  }

  protected setupRoutes(): void {
    this.setupCreateUserRoute();
    this.setupUpdateUserRoute();
    this.setupDeleteUserRoute();
    this.setupLoginUserRoute();
  }

  private setupCreateUserRoute(): void {
    this.router.post(
      "/",
      this.handleCreateUser.bind(this)
    );
  }

  private async handleCreateUser(c: Context): Promise<Response> {
    const controller = this.container.get(
      "CreateUserController"
    );
    return await controller.handle(c);
  }

  private setupUpdateUserRoute(): void {
    const authMiddleware = this.container.get("AuthMiddleware");
    this.router.put(
      "/:id",
      authMiddleware.handle,
      this.handleUpdateUser.bind(this)
    );
  }

  private async handleUpdateUser(c: Context): Promise<Response> {
    const controller = this.container.get(
      "UpdateUserController"
    );
    return await controller.handle(c);
  }

  private setupDeleteUserRoute(): void {
    const authMiddleware = this.container.get("AuthMiddleware");
    this.router.delete(
      "/:id",
      authMiddleware.handle,
      this.handleDeleteUser.bind(this)
    );
  }

  private async handleDeleteUser(c: Context): Promise<Response> {
    const controller = this.container.get(
      "DeleteUserController"
    );
    return await controller.handle(c);
  }

  private setupLoginUserRoute(): void {
    this.router.post(
      "/login",
      this.handleLoginUser.bind(this)
    );
  }

  private async handleLoginUser(c: Context): Promise<Response> {
    const controller = this.container.get(
      "LoginUserController"
    );
    return await controller.handle(c);
  }
}

export default UserRouter.getInstance;
