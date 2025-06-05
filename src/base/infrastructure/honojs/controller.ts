import { NotFoundError } from "@base/errors/not-found-error";
import { ValidationError } from "@base/errors/validation-error";
import { logger } from "@infrastructure/logger";
import type { Context } from "hono";
import type { StatusCode } from 'hono/utils/http-status'
import { ZodError } from "zod";

export abstract class BaseHonoJSController {
  protected sendSuccessResponse(
    c: Context,
    message: string,
    data?: any,
    statusCode: StatusCode = 200
  ): Response {
    c.status(statusCode);
    return c.json({
      message,
      data
    });
  }

  protected sendErrorResponse(
    c: Context,
    message: string,
    statusCode: StatusCode = 400,
    errors?: any[]
  ): Response {
    c.status(statusCode);
    return c.json({
      message,
      errors
    });
  }

  protected handleControllerError(
    error: unknown,
    c: Context,
    controllerName: string
  ): Response {
    logger.error(`Error in ${controllerName}`, {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });

    if (error instanceof NotFoundError) {
      return this.sendErrorResponse(c, error.message, 404);
    }

    if (error instanceof ValidationError) {
      return this.sendErrorResponse(c, error.message, 400);
    }

    if (error instanceof ZodError) {
      return this.sendErrorResponse(c, "Validation error", 400, error.errors);
    }

    return this.sendErrorResponse(
      c,
      "Internal server error",
      500
    );
  }
}
