import type { Context } from "hono";
import { logger } from "@infrastructure/logger";
import { BaseHonoJSController } from "@base/infrastructure/honojs/controller";
import { GetAllByUserIdUseCaseInterface } from "@domain/use-case/url/get-all-by-user-id/interface";
import { GetAllByUserIdRequest } from "@domain/use-case/url/get-all-by-user-id/request";

export class GetAllByUserIdController extends BaseHonoJSController {
  constructor(private readonly useCase: GetAllByUserIdUseCaseInterface) {
    super();
  }

  async handle(c: Context): Promise<Response> {
    try {
      const userId = c.get("userId");
      const request = GetAllByUserIdRequest.create(userId);
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        const urlEntity = response.getData();
        if (!urlEntity) {
          throw new Error("URL not created");
        }

        return this.sendSuccessResponse(
          c,
          "URLs found successfully",
          urlEntity,
          200
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
