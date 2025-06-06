import { UserNotFoundError } from '@domain/entities/user/errors/not-found';
import { UserRepositoryInterface } from '@domain/entities/user/repositories/interfaces';
import { UserId } from '@domain/entities/user/value-objects/id';
import { logger } from '@infrastructure/logger';

import { DeleteUserUseCaseInterface } from './interfaces';
import { DeleteUserRequest } from './request';
import { DeleteUserResponse } from './response';

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    try {
      const userId = UserId.create(request.getId());
      logger.info('Starting user deletion process', {
        userId: userId.getValue(),
      });

      logger.debug('Verifying user existence');
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new UserNotFoundError(userId.toString());
      }

      logger.debug('Deleting user', {
        userId: userId.getValue(),
        email: user.getEmail().getValue(),
      });

      await this.userRepository.delete(userId);

      logger.info('User deleted successfully', {
        userId: userId.getValue(),
        email: user.getEmail().getValue(),
      });

      return DeleteUserResponse.success();
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): DeleteUserResponse {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return DeleteUserResponse.failure('Houve um erro ao deletar o usuário', errors);
  }
}
