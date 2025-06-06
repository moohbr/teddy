import type { UserRepositoryInterface } from "@domain/entities/user/repositories/interfaces";
import { and, eq } from "drizzle-orm";
import { usersTable } from "../models/user";
import type { DatabaseType } from "../types";
import { UserEntity } from "@domain/entities/user/entity";
import { UserEmail } from "@domain/entities/user/value-objects/email";
import { UserId } from "@domain/entities/user/value-objects/id";
import { UserPassword } from "@domain/entities/user/value-objects/password";


export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly db: DatabaseType) { }

  public async create(user: UserEntity): Promise<UserEntity> {
    const userEntity = UserEntity.create({
      name: user.getName(),
      email: user.getEmail(),
      passwordHash: user.getPasswordHash(),
    });

    const persistenceData = userEntity.toPersistence();

    await this.db.insert(usersTable).values({
      name: persistenceData.name.getValue(),
      email: persistenceData.email.getValue(),
      password: persistenceData.passwordHash.getValue(),
      active: true,
    });

    return userEntity;
  }

  public async findByEmail(email: UserEmail): Promise<UserEntity | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.email, email.getValue()), eq(usersTable.active, true)))
      .limit(1);

    if (!user) return null;

    return UserEntity.reconstruct(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.password
    );
  }

  public async findById(id: UserId): Promise<UserEntity | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.id, id.getValue()), eq(usersTable.active, true)))
      .limit(1);

    if (!user) return null;

    return UserEntity.reconstruct(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.password
    );
  }

  public async update(id: UserId, user: UserEntity): Promise<UserEntity | null> {
    const [userData] = await this.db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.id, id.getValue()), eq(usersTable.active, true)))

    if (!userData) return null;

    const result = await this.db.update(usersTable).set({
      name: user.getName().getValue(),
      email: user.getEmail().getValue(),
      password: user.getPasswordHash().getValue(),
    }).where(and(eq(usersTable.id, id.getValue()), eq(usersTable.active, true)));

    if (result.rowCount === 0) return null;

    return UserEntity.reconstruct(
      userData.id,
      userData.name,
      userData.email,
      userData.createdAt,
      userData.password
    );
  }

  public async delete(id: UserId): Promise<void> {
    await this.db.update(usersTable).set({ active: false }).where(eq(usersTable.id, id.getValue()));
  } 
}
