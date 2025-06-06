import { DeleteByShortIdRequest } from "./request";
import { DeleteByShortIdResponse } from "./response";

export interface DeleteByShortIdUseCaseInterface {
  execute(request: DeleteByShortIdRequest): Promise<DeleteByShortIdResponse>;
}