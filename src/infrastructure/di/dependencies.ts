// Repositories
// Url
import type { URLRepository } from "@infrastructure/datasource/databases/drizzle/repositories/url";
// Use Cases
// Url
import type { CreateUrlUseCase } from "@domain/use-case/url/create-a-url";
import type { FindUrlByShortIdUseCase } from "@domain/use-case/url/find-by-short-id";
// Controllers
// Url
import type { CreateUrlController } from "@infrastructure/http/controllers/url/create";
import type { RedirectUrlController } from "@infrastructure/http/controllers/root/redirect";



export interface DependencyMap {
  UrlRepository: URLRepository;
  CreateUrlUseCase: CreateUrlUseCase;
  CreateUrlController: CreateUrlController;
  FindByShortIdUseCase: FindUrlByShortIdUseCase
  RedirectUrlController: RedirectUrlController;
}
