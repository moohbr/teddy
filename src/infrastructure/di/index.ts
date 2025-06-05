// Infrastructure
import { db } from "@infrastructure/datasource/databases/drizzle";
// Repositories
import { URLRepository } from "@infrastructure/datasource/databases/drizzle/repositories/url";
// Errors
import { DependencyInstanciatedError } from "@base/errors/dependency-not-instanciated-error";
// Use Cases
// Url
import { CreateUrlUseCase } from "@domain/use-case/url/create-a-url";
// Controllers
// Url
import { CreateUrlController } from "@infrastructure/http/controllers/url/create";
import type { DependencyMap } from "./dependencies";
import { RedirectUrlController } from "@infrastructure/http/controllers/root/redirect";
import { FindUrlByShortIdUseCase } from "@domain/use-case/url/find-by-short-id";

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
    this.register("UrlRepository", new URLRepository(db));
  }

  private registerServices(): void { }

  private registerUseCases(): void {
    this.register("CreateUrlUseCase", new CreateUrlUseCase(
      this.get("UrlRepository")
    ));
    this.register("FindByShortIdUseCase", new FindUrlByShortIdUseCase(
      this.get("UrlRepository")
    ));
  }

  private registerControllers(): void {
    this.register("CreateUrlController", new CreateUrlController(
      this.get("CreateUrlUseCase")
    ));
    this.register("RedirectUrlController", new RedirectUrlController(
      this.get("FindByShortIdUseCase")
    ));

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

