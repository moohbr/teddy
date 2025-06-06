import { Context, Next } from "hono";
import { AuthServiceInterface } from "@domain/services/auth/interfaces";
import { NotAuthorizedError } from "@base/errors/not-authorized-error";
import { BaseHonoJSController } from "@base/infrastructure/honojs/controller";
import { StatusCode } from "hono/utils/http-status";

export class AuthMiddleware extends BaseHonoJSController {
  public readonly handle: (c: Context, next: Next) => Promise<Response | void>;

  constructor(private readonly authService: AuthServiceInterface) {
    super();
    this.handle = this.handleRequest.bind(this);
  }

  private async handleRequest(c: Context, next: Next): Promise<Response | void> {
    try {
      const authHeader = c.req.header("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new NotAuthorizedError("No bearer token provided");
      }

      const token = authHeader.split(" ")[1];
      const payload = this.authService.verifyToken(token);

      if (!payload.user?.id) {
        throw new NotAuthorizedError("Invalid token payload");
      }

      // Set the userId in the context for downstream use
      c.set("userId", payload.user.id);

      await next();
    } catch (error) {
      if (error instanceof NotAuthorizedError) {
        return this.sendErrorResponse(c, error.message, error.getStatusCode() as StatusCode);
      }

      return this.sendErrorResponse(c, "Authentication failed", 401 as StatusCode);
    }
  }
} 