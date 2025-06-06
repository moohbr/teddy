// Repositories
// Url
import type { URLRepository } from "@infrastructure/datasource/databases/drizzle/repositories/url";
// User
import type { UserRepository } from "@infrastructure/datasource/databases/drizzle/repositories/user";
// Use Cases
// Url
import type { CreateUrlUseCase } from "@domain/use-case/url/create-a-url";
import type { FindUrlByShortIdUseCase } from "@domain/use-case/url/find-by-short-id";
// User
import type { LoginUseCase } from "@domain/use-case/user/login";
import type { DeleteUserUseCase } from "@domain/use-case/user/delete";
import type { UpdateUserUseCase } from "@domain/use-case/user/update";
import type { CreateUserUseCase } from "@domain/use-case/user/create";
import type { GetAllByUserIdUseCase } from "@domain/use-case/url/get-all-by-user-id";
import type { DeleteUrlController } from "@infrastructure/http/controllers/url/delete";
import type { UpdateUrlController } from "@infrastructure/http/controllers/url/update";
// Controllers
// Url
import type { CreateUrlController } from "@infrastructure/http/controllers/url/create";
import type { RedirectUrlController } from "@infrastructure/http/controllers/root/redirect";
import type { UpdateUrlUseCase } from "@domain/use-case/url/update-a-url";
import type { DeleteByShortIdUseCase } from "@domain/use-case/url/delete-by-short-id";
// User
import type { CreateUserController } from "@infrastructure/http/controllers/user/create";
import type { UpdateUserController } from "@infrastructure/http/controllers/user/update";
import type { DeleteUserController } from "@infrastructure/http/controllers/user/delete";
import type { LoginUserController } from "@infrastructure/http/controllers/user/login";
import type { GetAllByUserIdController } from "@infrastructure/http/controllers/url/get-all-by-userId";
import type { AuthService } from "@domain/services/auth";
import type { AuthMiddleware } from "@infrastructure/http/middlewares/auth";


export interface DependencyMap {
  UrlRepository: URLRepository;
  CreateUrlUseCase: CreateUrlUseCase;
  CreateUrlController: CreateUrlController;
  FindByShortIdUseCase: FindUrlByShortIdUseCase
  RedirectUrlController: RedirectUrlController;
  GetAllByUserIdUseCase: GetAllByUserIdUseCase;
  GetAllByUserIdController: GetAllByUserIdController;
  UpdateUrlUseCase: UpdateUrlUseCase;
  UpdateUrlController: UpdateUrlController;
  DeleteByShortIdUseCase: DeleteByShortIdUseCase;
  DeleteUrlController: DeleteUrlController;
  // User
  UserRepository: UserRepository;
  CreateUserUseCase: CreateUserUseCase;
  CreateUserController: CreateUserController;
  UpdateUserUseCase: UpdateUserUseCase;
  UpdateUserController: UpdateUserController;
  DeleteUserUseCase: DeleteUserUseCase;
  DeleteUserController: DeleteUserController;
  LoginUserUseCase: LoginUseCase;
  LoginUserController: LoginUserController;
  AuthService: AuthService;
  AuthMiddleware: AuthMiddleware;
}
