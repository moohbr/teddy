import type { Context } from "hono";
import { logger } from "@infrastructure/logger";
import { BaseHonoJSController } from "@base/infrastructure/honojs/controller";
import type { CreateUrlUseCaseInterface } from "@domain/use-case/url/create-a-url/interfaces";
import { CreateUrlRequest } from "@domain/use-case/url/create-a-url/request";

export class CreateUrlController extends BaseHonoJSController {
  constructor(private readonly useCase: CreateUrlUseCaseInterface) {
    super();
  }

  async handle(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();
      const userId = c.get("userId");
      const request = CreateUrlRequest.create(body.originalUrl, userId);
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        const urlEntity = response.getData();
        if (!urlEntity) {
          throw new Error("URL not created");
        }

        return this.sendSuccessResponse(
          c,
          "URL created successfully",
          {
            shortId: urlEntity.getShortId().getValue(),
            originalUrl: urlEntity.getOriginalUrl().getValue(),
            shortUrl: `${c.req.url.split('/').slice(0, 3).join('/')}/${urlEntity.getShortId().getValue()}` // Assuming base URL construction
          },
          201
        );
      }

      if (response.getErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error creating URL", { error: error.message });
        }
        throw response.getErrors()[0];
      }

      throw new Error("Unknown error occurred");
    } catch (error) {
      return this.handleControllerError(error, c, "CreateUrlController");
    }
  }
}
