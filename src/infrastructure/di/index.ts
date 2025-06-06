// Infrastructure
import { DependencyInstanciatedError } from '@base/errors/dependency-not-instanciated-error';
import { AuthService } from '@domain/services/auth';
import { CreateUrlUseCase } from '@domain/use-case/url/create-a-url';
import { FindUrlByShortIdUseCase } from '@domain/use-case/url/find-by-short-id';
import { GetAllByUserIdUseCase } from '@domain/use-case/url/get-all-by-user-id';
// Repositories
// Errors
// Use Cases
// Url
// User
import { CreateUserUseCase } from '@domain/use-case/user/create';
import { DeleteUserUseCase } from '@domain/use-case/user/delete';
import { LoginUseCase } from '@domain/use-case/user/login';
import { UpdateUserUseCase } from '@domain/use-case/user/update';
import { db } from '@infrastructure/datasource/databases/drizzle';
import { URLRepository } from '@infrastructure/datasource/databases/drizzle/repositories/url';
// Controllers
// Url
import { UserRepository } from '@infrastructure/datasource/databases/drizzle/repositories/user';
import { RedirectUrlController } from '@infrastructure/http/controllers/root/redirect';
import { CreateUrlController } from '@infrastructure/http/controllers/url/create';
import { GetAllByUserIdController } from '@infrastructure/http/controllers/url/get-all-by-userId';
// User
import { CreateUserController } from '@infrastructure/http/controllers/user/create';
import { DeleteUserController } from '@infrastructure/http/controllers/user/delete';
import { LoginUserController } from '@infrastructure/http/controllers/user/login';
import { UpdateUserController } from '@infrastructure/http/controllers/user/update';
// Services
import { AuthMiddleware } from '@infrastructure/http/middlewares/auth';

import type { DependencyMap } from './dependencies';

export class DIContainer {
  private static instance: DIContainer;
  private dependencies: Map<keyof DependencyMap, unknown> = new Map();

  private constructor() {
    this.registerDependencies();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  private registerDependencies(): void {
    this.registerRepositories();
    this.registerServices();
    this.registerUseCases();
    this.registerControllers();
  }

  private registerRepositories(): void {
    this.register('UrlRepository', new URLRepository(db));
    this.register('UserRepository', new UserRepository(db));
  }

  private registerServices(): void {
    this.register('AuthService', new AuthService());
    this.register('AuthMiddleware', new AuthMiddleware(this.get('AuthService')));
  }

  private registerUseCases(): void {
    this.register(
      'CreateUrlUseCase',
      new CreateUrlUseCase(this.get('UrlRepository'), this.get('UserRepository')),
    );
    this.register('FindByShortIdUseCase', new FindUrlByShortIdUseCase(this.get('UrlRepository')));
    this.register('CreateUserUseCase', new CreateUserUseCase(this.get('UserRepository')));
    this.register('UpdateUserUseCase', new UpdateUserUseCase(this.get('UserRepository')));
    this.register('DeleteUserUseCase', new DeleteUserUseCase(this.get('UserRepository')));
    this.register('GetAllByUserIdUseCase', new GetAllByUserIdUseCase(this.get('UrlRepository')));
    this.register(
      'LoginUserUseCase',
      new LoginUseCase(this.get('UserRepository'), this.get('AuthService')),
    );
  }

  private registerControllers(): void {
    this.register('CreateUrlController', new CreateUrlController(this.get('CreateUrlUseCase')));
    this.register(
      'RedirectUrlController',
      new RedirectUrlController(this.get('FindByShortIdUseCase')),
    );
    this.register('CreateUserController', new CreateUserController(this.get('CreateUserUseCase')));
    this.register('UpdateUserController', new UpdateUserController(this.get('UpdateUserUseCase')));
    this.register('DeleteUserController', new DeleteUserController(this.get('DeleteUserUseCase')));
    this.register('LoginUserController', new LoginUserController(this.get('LoginUserUseCase')));
    this.register(
      'GetAllByUserIdController',
      new GetAllByUserIdController(this.get('GetAllByUserIdUseCase')),
    );
  }

  public get<K extends keyof DependencyMap>(key: K): DependencyMap[K] {
    const dependency = this.dependencies.get(key);
    if (!dependency) {
      throw new DependencyInstanciatedError(String(key));
    }
    return dependency as DependencyMap[K];
  }

  public register<K extends keyof DependencyMap>(key: K, instance: DependencyMap[K]): void {
    this.dependencies.set(key, instance);
  }

  public has<K extends keyof DependencyMap>(key: K): boolean {
    return this.dependencies.has(key);
  }
}
