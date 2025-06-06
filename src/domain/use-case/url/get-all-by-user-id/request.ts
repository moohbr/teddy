import { UserId } from "@domain/entities/user/value-objects/id";

export class GetAllByUserIdRequest {
  constructor(
    private readonly userId: UserId,
  ) {}

  public static create(userId: string): GetAllByUserIdRequest {
    return new GetAllByUserIdRequest(
      UserId.create(userId),
    );
  }
  public getUserId(): UserId {
    return this.userId;
  }

}