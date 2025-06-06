import { BaseHonoJSController } from "@base/infrastructure/honojs/controller";
import { LoginUseCaseInterface } from "@domain/use-case/user/login/interfaces";
import { LoginRequest } from "@domain/use-case/user/login/request";
import { Context } from "hono";
        
export class LoginUserController extends BaseHonoJSController {
  constructor(private readonly loginUserUseCase: LoginUseCaseInterface) {
    super();
  }
  async handle(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();
2
      const request = LoginRequest.create(body.email, body.password);
      const response = await this.loginUserUseCase.execute(request);

      if (response.isSuccess()) {
        return c.json({ message: "User logged in successfully", token: response.getData()?.token }, 200);
      }

      return c.json({ error: response.getErrors() }, 400);
    } catch (error) {
      return this.handleControllerError(error, c, "LoginUserController");
    }
  }
}