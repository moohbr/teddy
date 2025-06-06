import { URLRepositoryInterface } from '@domain/entities/url/repositories';
import { logger } from '@infrastructure/logger';

import { GetAllByUserIdUseCaseInterface } from './interface';
import { GetAllByUserIdRequest } from './request';
import { GetAllByUserIdResponse } from './response';

export class GetAllByUserIdUseCase implements GetAllByUserIdUseCaseInterface {
  constructor(private readonly urlRepository: URLRepositoryInterface) {}

  public async execute(request: GetAllByUserIdRequest): Promise<GetAllByUserIdResponse> {
    try {
      logger.info('Starting user creation process');

      const urls = await this.urlRepository.findAllByUserId(request.getUserId());
      if (urls) {
        return GetAllByUserIdResponse.success(urls);
      }

      return GetAllByUserIdResponse.failure('Nenhuma URL encontrada');
    } catch (error) {
      logger.error('Error during user creation', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): GetAllByUserIdResponse {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return GetAllByUserIdResponse.failure('Houve um erro ao buscar as URLs', errors);
  }
}
