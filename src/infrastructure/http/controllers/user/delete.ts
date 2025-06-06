import { Context } from 'hono';

import { BaseHonoJSController } from '@base/infrastructure/honojs/controller';
import { UserId } from '@domain/entities/user/value-objects/id';
import { DeleteUserUseCaseInterface } from '@domain/use-case/user/delete/interfaces';
import { DeleteUserRequest } from '@domain/use-case/user/delete/request';

export class DeleteUserController extends BaseHonoJSController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCaseInterface) {
    super();
  }
  async handle(c: Context): Promise<Response> {
    try {
      const id = c.req.param('id');

      const request = DeleteUserRequest.create(UserId.create(id));
      const response = await this.deleteUserUseCase.execute(request);

      if (response.isSuccess()) {
        return c.json({ message: 'User deleted successfully' }, 200);
      }

      return c.json({ error: response.getErrors() }, 400);
    } catch (error) {
      return this.handleControllerError(error, c, 'CreateUserController');
    }
  }
}
