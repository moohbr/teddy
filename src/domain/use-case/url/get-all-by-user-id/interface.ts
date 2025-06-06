import { GetAllByUserIdRequest } from "./request";
import { GetAllByUserIdResponse } from "./response";

export interface GetAllByUserIdUseCaseInterface {
  execute(input: GetAllByUserIdRequest): Promise<GetAllByUserIdResponse>;
}