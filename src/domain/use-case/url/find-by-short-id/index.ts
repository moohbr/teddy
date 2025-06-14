import { UrlNotFoundError } from '@domain/entities/url/errors/not-found';
import type { URLRepositoryInterface } from '@domain/entities/url/repositories';
import { logger } from '@infrastructure/logger';

import type { FindUrlByShortIdUseCaseInterface } from './interfaces';
import type { FindUrlByShortIdRequest } from './request';
import { FindUrlByShortIdResponse } from './response';

export class FindUrlByShortIdUseCase implements FindUrlByShortIdUseCaseInterface {
  constructor(private readonly urlRepository: URLRepositoryInterface) {}

  public async execute(request: FindUrlByShortIdRequest): Promise<FindUrlByShortIdResponse> {
    try {
      const shortId = request.getShortId();

      logger.info('Starting URL lookup process', {
        shortId: shortId.getValue(),
      });

      logger.debug('Searching for URL by short ID');
      const urlEntity = await this.urlRepository.findByShortId(shortId);

      if (!urlEntity) {
        const error = new UrlNotFoundError(shortId.getValue());
        logger.warn('URL not found', {
          shortId: shortId.getValue(),
          error: error.message,
        });
        throw error;
      }

      await this.urlRepository.incrementCountByShortId(urlEntity.getShortId());

      logger.info('URL found successfully', {
        shortId: urlEntity.getShortId().getValue(),
        originalUrl: urlEntity.getOriginalUrl().getValue(),
      });

      return FindUrlByShortIdResponse.success(urlEntity);
    } catch (error) {
      logger.error('Unexpected error during URL lookup', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        shortId: request.getShortId().getValue(),
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): FindUrlByShortIdResponse {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return FindUrlByShortIdResponse.failure('Houve um erro ao buscar a URL', errors);
  }
}
