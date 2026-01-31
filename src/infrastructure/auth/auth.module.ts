import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../presentation/http/auth/auth.controller'
import { LoginUserUseCase } from '../../application/auth/use-cases/login-user.usecase';
import { RegisterUserUseCase } from '../../application/auth/use-cases/register-user.usecase';
import { UserOrmEntity } from '../database/typeorm/entities/user.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY } from '../../domains/users/repository/user.repository';
import { UserRepositoryImpl } from '../database/repositories/user.repository.impl';
import { BcryptPasswordHasher } from './bcrypt-password-hasher.service';
import { JwtTokenService } from './jwt-token.service';
import { PASSWORD_HASHER } from 'src/application/ports/password-hasher.port';
import { TOKEN } from 'src/application/ports/token.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret', signOptions: { expiresIn: '15m' } }),
  ],

  controllers: [AuthController],

  providers: [
    LoginUserUseCase,
    RegisterUserUseCase,

    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN, useClass: JwtTokenService },
  ],
})
export class AuthModule {}

