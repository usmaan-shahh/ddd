import { UserId } from 'src/domains/users/value-objects/user-id';
import { User } from '../../../domains/users/entity/user.entity';
import { Email } from '../../../domains/users/value-objects/email';
import { Password } from '../../../domains/users/value-objects/password';
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
    orm.passwordHash = user.getPassword();

    return orm;
  }
  
}
