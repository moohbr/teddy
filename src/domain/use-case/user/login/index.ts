import { InvalidCredentialsError } from '@base/errors/invalid-credentials-error';
import { UserRepositoryInterface } from '@domain/entities/user/repositories/interfaces';
import { AuthServiceInterface } from '@domain/services/auth/interfaces';
import { LoginUseCaseInterface } from '@domain/use-case/user/login/interfaces';
import { LoginRequest } from '@domain/use-case/user/login/request';
import { LoginResponse } from '@domain/use-case/user/login/response';
import { logger } from '@infrastructure/logger';

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly authService: AuthServiceInterface,
  ) {}

  public async execute(request: LoginRequest): Promise<LoginResponse> {
    try {
      logger.info('Starting login process', { request: request.getEmail() });

      const user = await this.userRepository.findByEmail(request.getEmail());

      if (!user) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      logger.debug('User found, validating password', { userId: user.getId() });

      const isValid = user.getPasswordHash().compare(request.getPassword().getValue());

      if (!isValid) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      const token = this.authService.generateToken({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      });

      logger.info('Login successful', {
        userId: user.getId(),
        email: user.getEmail(),
        token: token,
      });

      return LoginResponse.success({
        token,
        user,
      });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw error;
      }

      logger.error('Unexpected error during login', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): LoginResponse {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return LoginResponse.failure('Houve um erro ao fazer login', errors);
  }
}
