import type { CreateUrlRequest } from "./request";
import type { CreateUrlResponse } from "./response";

export interface CreateUrlUseCaseInterface {
  execute(request: CreateUrlRequest): Promise<CreateUrlResponse>;
}
