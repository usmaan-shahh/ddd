import { Module } from '@nestjs/common';
import { AuthController } from '../../presentation/http/auth/auth.controller'
import { LoginUserUseCase } from '../../application/auth/use-cases/login-user.usecase';
import { RegisterUserUseCase } from '../../application/auth/use-cases/register-user.usecase';
import { UserOrmEntity } from '../database/typeorm/entities/user.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY, UserRepository } from '../../domains/users/repository/user.repository';
import { UserRepositoryImpl } from '../database/repositories/user.repository.impl';
import { BcryptPasswordHasher } from './bcrypt-password-hasher.service';
import { PASSWORD_HASHER, PasswordHasherPort } from 'src/application/ports/password-hasher.port';


@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],

  controllers: [AuthController],

  providers: [
    LoginUserUseCase,
    RegisterUserUseCase,

    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },

    {
      provide: PASSWORD_HASHER,
      useClass: BcryptPasswordHasher,
    },
  ],
})
export class AuthModule {}

