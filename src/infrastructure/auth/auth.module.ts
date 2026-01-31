import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../../presentation/http/auth/auth.controller';
import { LoginUserUseCase, RegisterUserUseCase } from '../../application/auth/auth.use-cases';
import { USER_REPOSITORY } from '../../domains/users/repository/user.repository';
import { UserOrmEntity } from '../database/typeorm/entities/user.orm-entity';
import { UserRepositoryImpl } from '../database/repositories/user.repository.impl';
import { BcryptPasswordHasher } from './bcrypt-password-hasher.service';
import { JwtTokenService } from './jwt-token.service';
import { PASSWORD_HASHER, TOKEN_PORT } from '../../application/ports/auth.ports';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'change-me-in-production'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUserUseCase,
    RegisterUserUseCase,
    JwtTokenService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: TOKEN_PORT,
      useClass: JwtTokenService,
    },
  ],
})
export class AuthModule {}

