import { BaseHonoJSController } from "@base/infrastructure/honojs/controller";
import { UserEmail } from "@domain/entities/user/value-objects/email";
import { UserId } from "@domain/entities/user/value-objects/id";
import { UserName } from "@domain/entities/user/value-objects/name";
import { UserPassword } from "@domain/entities/user/value-objects/password";
import { UpdateUserUseCaseInterface } from "@domain/use-case/user/update/interfaces";
import { UpdateUserRequest } from "@domain/use-case/user/update/request";
import { Context } from "hono";
        
export class UpdateUserController extends BaseHonoJSController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCaseInterface) {
    super();
  }
  async handle(c: Context): Promise<Response> {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      const request = UpdateUserRequest.create(
        UserId.create(id), 
        UserName.create(body.name), 
        UserEmail.create(body.email), 
        UserPassword.create(body.password)
    );
    
      const response = await this.updateUserUseCase.execute(request);

      if (response.isSuccess()) {
        return c.json({ message: "User updated successfully" }, 200);
      }

      return c.json({ error: response.getErrors() }, 400);
    } catch (error) {
      return this.handleControllerError(error, c, "UpdateUserController");
    }
  }
}