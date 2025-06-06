import { URLRepositoryInterface } from '@domain/entities/url/repositories';
import { logger } from '@infrastructure/logger';

import { DeleteByShortIdUseCaseInterface } from './interface';
import { DeleteByShortIdRequest } from './request';
import { DeleteByShortIdResponse } from './response';

export class DeleteByShortIdUseCase implements DeleteByShortIdUseCaseInterface {
  constructor(private readonly urlRepository: URLRepositoryInterface) {}

  public async execute(request: DeleteByShortIdRequest): Promise<DeleteByShortIdResponse> {
    try {
      logger.info('Starting delete by short id process');

      const url = await this.urlRepository.findByShortId(request.getShortId());
      if (!url) {
        return DeleteByShortIdResponse.failure('URL não encontrada');
      }

      if (!url.isOwner(request.getUserId())) {
        return DeleteByShortIdResponse.failure('URL não encontrada');
      }

      await this.urlRepository.deleteByShortId(request.getShortId());

      return DeleteByShortIdResponse.success();
    } catch (error) {
      logger.error('Error during user creation', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): DeleteByShortIdResponse {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return DeleteByShortIdResponse.failure('Houve um erro ao deletar a URL', errors);
  }
}
