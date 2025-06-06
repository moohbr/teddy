import { UpdateUrlRequest } from './request';
import { UpdateUrlResponse } from './response';

export interface UpdateUrlUseCaseInterface {
  execute(request: UpdateUrlRequest): Promise<UpdateUrlResponse>;
}
