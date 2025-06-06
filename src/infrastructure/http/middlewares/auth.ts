import { Context, Next } from "hono";
import { AuthServiceInterface } from "@domain/services/auth/interfaces";
import { NotAuthorizedError } from "@base/errors/not-authorized-error";
import { BaseHonoJSController } from "@base/infrastructure/honojs/controller";
import { StatusCode } from "hono/utils/http-status";
import { logger } from "@infrastructure/logger";

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

      const route = c.req.path;
      // Exclusive POST /v1/url route does not require authentication
      if (route.includes("/url") && c.req.method === "POST") {
        logger.info("Skipping authentication for POST /v1/url route");
        c.set("userId", payload.user.id);
        await next();
        return;
      }

      if (!payload.user?.id) {
        throw new NotAuthorizedError("Invalid token payload");
      }

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