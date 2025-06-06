import { UserEntity } from '@domain/entities/user/entity';
import { UserAlreadyExistsError } from '@domain/entities/user/errors/already-existits';
import { UserRepositoryInterface } from '@domain/entities/user/repositories/interfaces';
import { CreateUserUseCaseInterface } from '@domain/use-case/user/create/interfaces';
import { CreateUserRequest } from '@domain/use-case/user/create/request';
import { CreateUserResponse } from '@domain/use-case/user/create/response';
import { logger } from '@infrastructure/logger';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      logger.info('Starting user creation process');

      const userExists = await this.userRepository.findByEmail(request.getEmail());
      if (userExists) {
        throw new UserAlreadyExistsError('User already exists');
      }

      const newUser = UserEntity.create({
        name: request.getName(),
        email: request.getEmail(),
        passwordHash: request.getPassword(),
      });

      await this.userRepository.create(newUser);

      return CreateUserResponse.success(newUser);
    } catch (error) {
      logger.error('Error during user creation', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): CreateUserResponse {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return CreateUserResponse.failure('Houve um erro ao criar o usuário', errors);
  }
}
