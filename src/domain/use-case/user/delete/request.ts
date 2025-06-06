import { UserId } from '@domain/entities/user/value-objects/id';

export class DeleteUserRequest {
  constructor(private readonly id: UserId) {}

  public static create(id: UserId): DeleteUserRequest {
    return new DeleteUserRequest(id);
  }

  public getId(): UserId {
    return this.id;
  }
}
