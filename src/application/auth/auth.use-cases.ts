import { Inject } from '@nestjs/common';
import { USER_REPOSITORY, type UserRepository } from '../../domains/users/repository/user.repository';
import { User } from '../../domains/users/entity/user.entity';
import { Email, Password } from '../../domains/users/value-objects';
import { EmailAlreadyExistsError, InvalidCredentialsError } from '../../domains/users/errors';
import type { RegisterDto, LoginDto } from '../dto/auth.dto';
import { PASSWORD_HASHER, TOKEN_PORT, type PasswordHasherPort, type TokenPort } from '../ports/auth.ports';

export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(body: RegisterDto) {
    const exists = await this.userRepository.findByEmail(body.email);
    if (exists) throw new EmailAlreadyExistsError();

    const hashedPassword = await this.passwordHasher.hash(body.password);
    const email = Email.create(body.email);
    const password = Password.create(hashedPassword);
    const user = User.create({ email, password });

    await this.userRepository.save(user);
    return { userId: user.getId() };
  }
}

export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasherPort,
    @Inject(TOKEN_PORT) private readonly tokenPort: TokenPort,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new InvalidCredentialsError();

    const passwordValid = await this.passwordHasher.compare(dto.password, user.getPasswordHash());
    if (!passwordValid) throw new InvalidCredentialsError();

    const userId = user.getId();
    const accessToken = this.tokenPort.generateAccessToken({ userId });
    const refreshToken = this.tokenPort.generateRefreshToken({ userId });

    return { userId, accessToken, refreshToken };
  }
}
