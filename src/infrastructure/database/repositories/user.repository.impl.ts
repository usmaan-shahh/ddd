import { Injectable } from "@nestjs/common";
import { UserOrmEntity } from "../typeorm/entities/user.orm-entity";
import { UserRepository } from "../../../domains/users/repository/user.repository";
import { User } from "../../../domains/users/entity/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.repo.findOne({
      where: { email },
    });

    if (!ormUser) return null;

    return UserMapper.toDomain(ormUser);
  }

  async save(user: User): Promise<void> {
    const ormUser = UserMapper.toOrm(user);
    await this.repo.save(ormUser);
  }
}
