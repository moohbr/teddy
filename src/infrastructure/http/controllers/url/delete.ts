import type { Context } from 'hono';

import { NotAuthorizedError } from '@base/errors/not-authorized-error';
import { BaseHonoJSController } from '@base/infrastructure/honojs/controller';
import { DeleteByShortIdUseCaseInterface } from '@domain/use-case/url/delete-by-short-id/interface';
import { DeleteByShortIdRequest } from '@domain/use-case/url/delete-by-short-id/request';
import { logger } from '@infrastructure/logger';

export class DeleteUrlController extends BaseHonoJSController {
  constructor(private readonly useCase: DeleteByShortIdUseCaseInterface) {
    super();
  }

  async handle(c: Context): Promise<Response> {
    try {
      const shortId = c.req.param('shortId');
      const userId = c.get('userId');

      if (!userId) {
        throw new NotAuthorizedError('User not authenticated');
      }

      const request = DeleteByShortIdRequest.create(shortId, userId);
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        return this.sendSuccessResponse(c, 'URL deleted successfully', {}, 201);
      }

      if (response.getErrors()) {
        for (const error of response.getErrors()) {
          logger.error('Error creating URL', { error: error.message });
        }
        throw response.getErrors()[0];
      }

      throw new Error('Unknown error occurred');
    } catch (error) {
      return this.handleControllerError(error, c, 'CreateUrlController');
    }
  }
}
