import type { Context } from 'hono';

import { NotAuthorizedError } from '@base/errors/not-authorized-error';
import { BaseHonoJSController } from '@base/infrastructure/honojs/controller';
import { UpdateUrlUseCaseInterface } from '@domain/use-case/url/update-a-url/interface';
import { UpdateUrlRequest } from '@domain/use-case/url/update-a-url/request';
import { logger } from '@infrastructure/logger';

export class UpdateUrlController extends BaseHonoJSController {
  constructor(private readonly useCase: UpdateUrlUseCaseInterface) {
    super();
  }

  async handle(c: Context): Promise<Response> {
    try {
      const shortId = c.req.param('shortId');
      const userId = c.get('userId');

      if (!userId) {
        throw new NotAuthorizedError('User not authenticated');
      }

      const body = await c.req.json();

      const request = UpdateUrlRequest.create(shortId, body.originalUrl, userId);
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        const urlEntity = response.getData();
        if (!urlEntity) {
          throw new Error('URL not created');
        }

        return this.sendSuccessResponse(c, 'URL updated successfully', {}, 201);
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
