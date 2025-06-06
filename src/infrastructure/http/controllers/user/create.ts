import { Context } from 'hono';

import { BaseHonoJSController } from '@base/infrastructure/honojs/controller';
import { CreateUserUseCaseInterface } from '@domain/use-case/user/create/interfaces';
import { CreateUserRequest } from '@domain/use-case/user/create/request';

export class CreateUserController extends BaseHonoJSController {
  constructor(private readonly createUserUseCase: CreateUserUseCaseInterface) {
    super();
  }
  async handle(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();

      const request = CreateUserRequest.create(body.name, body.email, body.password);
      const response = await this.createUserUseCase.execute(request);

      if (response.isSuccess()) {
        const user = response.getData();
        return c.json(user.toJSON(), 201);
      }

      return c.json({ error: response.getErrors() }, 400);
    } catch (error) {
      return this.handleControllerError(error, c, 'CreateUserController');
    }
  }
}
