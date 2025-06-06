import { ValidationError } from '@base/errors/validation-error';
import type { URLRepositoryInterface } from '@domain/entities/url/repositories';
import { UserNotFoundError } from '@domain/entities/user/errors/not-found';
import { UserRepositoryInterface } from '@domain/entities/user/repositories/interfaces';
import { logger } from '@infrastructure/logger';

import type { CreateUrlUseCaseInterface } from './interfaces';
import type { CreateUrlRequest } from './request';
import { CreateUrlResponse } from './response';

export class CreateUrlUseCase implements CreateUrlUseCaseInterface {
  constructor(
    private readonly urlRepository: URLRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(request: CreateUrlRequest): Promise<CreateUrlResponse> {
    const originalUrl = request.getOriginalUrl();
    const originalUrlValue = originalUrl.getValue();
    const userId = request.getUserId();

    if (userId) {
      logger.info('Checking if user exists', {
        userId: userId,
      });
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return CreateUrlResponse.failure('User not found', [
          new UserNotFoundError('User not found'),
        ]);
      }
    }

    logger.info('Starting URL creation process', {
      originalUrl: originalUrlValue,
      userId: userId,
    });

    try {
      const parsedUrl = this.parseAndValidateUrl(originalUrlValue.toString());

      if (this.isCircularRedirection(parsedUrl)) {
        const message =
          'Circular redirection detected. Cannot shorten URLs pointing to this service.';
        logger.warn('Circular redirection attempt', {
          originalUrl: originalUrlValue,
          targetHost: parsedUrl.hostname,
          targetPort: parsedUrl.port,
        });
        return CreateUrlResponse.failure(message, [new ValidationError(message)]);
      }

      logger.debug('Creating new URL entity');
      const newUrlEntity = await this.urlRepository.create(originalUrl, userId);

      logger.info('URL created successfully', {
        shortId: newUrlEntity.getShortId().getValue(),
        originalUrl: newUrlEntity.getOriginalUrl().getValue(),
      });

      return CreateUrlResponse.success(newUrlEntity);
    } catch (error) {
      logger.error('Error during URL creation', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        originalUrl: originalUrlValue,
      });

      return this.handleError(error);
    }
  }

  private parseAndValidateUrl(urlString: string): URL {
    try {
      return new URL(urlString);
    } catch (error) {
      throw new ValidationError('Invalid URL format provided');
    }
  }

  private isCircularRedirection(parsedUrl: URL): boolean {
    const appHost = process.env.APP_HOST;
    const appPort = process.env.APP_PORT;

    if (!appHost || !appPort) {
      logger.warn('APP_HOST or APP_PORT environment variables not set');
      return false;
    }

    const targetHost = parsedUrl.hostname;
    const targetPort = parsedUrl.port || this.getDefaultPort(parsedUrl.protocol);

    logger.debug('Checking for circular redirection', {
      appHost,
      appPort,
      targetHost,
      targetPort,
      protocol: parsedUrl.protocol,
    });

    const isSameHost = this.isSameHost(targetHost, appHost);
    const isSamePort = targetPort === appPort.toString();

    return isSameHost && isSamePort;
  }

  private isSameHost(targetHost: string, appHost: string): boolean {
    if (targetHost === appHost) {
      return true;
    }

    const localhostVariants = ['localhost', '127.0.0.1', '0.0.0.0'];
    const isAppLocalhost = localhostVariants.includes(appHost);
    const isTargetLocalhost = localhostVariants.includes(targetHost);

    return isAppLocalhost && isTargetLocalhost;
  }

  private getDefaultPort(protocol: string): string {
    switch (protocol) {
      case 'http:':
        return '80';
      case 'https:':
        return '443';
      default:
        return '';
    }
  }

  private handleError(error: unknown): CreateUrlResponse {
    if (error instanceof ValidationError) {
      return CreateUrlResponse.failure(error.message, [error]);
    }

    const message = 'Houve um erro ao criar a URL encurtada';
    const errors = error instanceof Error ? [error] : [new Error('Unknown error occurred')];

    return CreateUrlResponse.failure(message, errors);
  }
}
