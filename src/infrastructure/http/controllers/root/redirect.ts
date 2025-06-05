import { BaseHonoJSController } from "@base/infrastructure/honojs/controller";
import type { FindUrlByShortIdUseCaseInterface } from "@domain/use-case/url/find-by-short-id/interfaces";
import { FindUrlByShortIdRequest } from "@domain/use-case/url/find-by-short-id/request";
import { logger } from "@infrastructure/logger";
import type { Context } from "hono";

export class RedirectUrlController extends BaseHonoJSController {
  constructor(private readonly useCase: FindUrlByShortIdUseCaseInterface) {
    super();
  }

  async handle(c: Context): Promise<Response> {
    try {
      const shortId = c.req.param('shortId');

      if (!shortId) {
        return this.sendErrorResponse(c, "Short ID is required", 400);
      }

      const request = FindUrlByShortIdRequest.create(shortId);
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        const urlEntity = response.getData();
        if (!urlEntity) {
          throw new Error("URL entity not found in successful response");
        }

        logger.info("URL redirect", {
          shortId: urlEntity.getShortId().getValue(),
          originalUrl: urlEntity.getOriginalUrl().getValue(),
          userAgent: c.req.header('user-agent'),
          ip: c.req.header('x-forwarded-for') || c.req.header('x-real-ip')
        });

        return c.redirect(urlEntity.getOriginalUrl().getValue(), 302);
      }

      if (response.isNotFound()) {
        logger.warn("URL not found", {
          shortId: shortId,
        })
        return this.sendErrorResponse(c, "URL not found", 404);
      }

      if (response.getErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error during redirect", { error: error.message });
        }
        throw response.getErrors()[0];
      }

      throw new Error("Unknown error occurred");
    } catch (error) {
      return this.handleControllerError(error, c, "RedirectUrlController");
    }
  }
}
