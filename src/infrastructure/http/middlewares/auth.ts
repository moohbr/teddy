import { Context, Next } from 'hono';
import { StatusCode } from 'hono/utils/http-status';

import { NotAuthorizedError } from '@base/errors/not-authorized-error';
import { BaseHonoJSController } from '@base/infrastructure/honojs/controller';
import { AuthServiceInterface } from '@domain/services/auth/interfaces';
import { logger } from '@infrastructure/logger';

export class AuthMiddleware extends BaseHonoJSController {
  public readonly handle: (c: Context, next: Next) => Promise<Response | void>;

  // Configure routes that don't require authentication
  private readonly publicRoutes = [{ path: '/url', method: 'POST' }];

  constructor(private readonly authService: AuthServiceInterface) {
    super();
    this.handle = this.handleRequest.bind(this);
  }

  private async handleRequest(c: Context, next: Next): Promise<Response | void> {
    try {
      const route = c.req.path;
      const method = c.req.method;
      const isPublic = this.isPublicRoute(route, method);

      logger.info('Processing request', { route, method, isPublic });

      const authHeader = c.req.header('Authorization');
      const hasToken = authHeader && authHeader.startsWith('Bearer ');

      if (isPublic) {
        if (hasToken) {
          try {
            const token = authHeader.split(' ')[1];
            if (token) {
              const payload = await this.authService.verifyToken(token);
              if (payload?.user?.id) {
                c.set('userId', payload.user.id);
                logger.debug('Optional authentication successful for public route', {
                  userId: payload.user.id,
                  route,
                });
              }
            }
          } catch (error) {
            logger.debug('Invalid token on public route, proceeding without auth', {
              route,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        }
        await next();
        return;
      }

      if (!hasToken) {
        throw new NotAuthorizedError('No bearer token provided');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new NotAuthorizedError('Invalid bearer token format');
      }

      const payload = await this.authService.verifyToken(token);
      if (!payload?.user?.id) {
        throw new NotAuthorizedError('Invalid token payload');
      }

      c.set('userId', payload.user.id);
      logger.debug('Authentication successful', { userId: payload.user.id, route });

      await next();
    } catch (error) {
      return this.handleAuthError(c, error);
    }
  }

  private isPublicRoute(path: string, method: string): boolean {
    return this.publicRoutes.some((route) => path.includes(route.path) && method === route.method);
  }

  private handleAuthError(c: Context, error: unknown): Response {
    if (error instanceof NotAuthorizedError) {
      logger.warn('Authentication failed', {
        error: error.message,
        route: c.req.path,
        method: c.req.method,
      });
      return this.sendErrorResponse(c, error.message, error.getStatusCode() as StatusCode);
    }

    logger.error('Unexpected authentication error', {
      error: error instanceof Error ? error.message : String(error),
      route: c.req.path,
      method: c.req.method,
    });
    return this.sendErrorResponse(c, 'Authentication failed', 401 as StatusCode);
  }
}
