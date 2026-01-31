import { User } from '../../../domains/users/entity/user.entity';
import { Email, Password, UserId } from '../../../domains/users/value-objects';
import { UserOrmEntity } from '../typeorm/entities/user.orm-entity';

export class UserMapper {
  static toDomain(entity: UserOrmEntity): User {
    return User.create({
      id: UserId.from(entity.id),
      email: Email.create(entity.email),
      password: Password.fromHash(entity.passwordHash),
    });
  }

  static toOrm(user: User): UserOrmEntity {
    const orm = new UserOrmEntity();

    orm.id = user.getId();
    orm.email = user.getEmail();
    orm.passwordHash = user.getPasswordHash();

    return orm;
  }
  
}
