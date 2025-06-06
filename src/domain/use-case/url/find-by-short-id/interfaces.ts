import type { FindUrlByShortIdRequest } from './request';
import type { FindUrlByShortIdResponse } from './response';

export interface FindUrlByShortIdUseCaseInterface {
  execute(request: FindUrlByShortIdRequest): Promise<FindUrlByShortIdResponse>;
}
