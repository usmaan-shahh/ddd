import type { UserRepository } from '../../../domains/users/repository/user.repository';
import { USER_REPOSITORY } from '../../../domains/users/repository/user.repository';
import { LoginDto } from '../../dto/login.dto';
import { InvalidCredentialsError } from 'src/domains/users/errors/invalid-credentials.error';
import type { TokenPort } from '../../ports/token.port';
import { TOKEN } from '../../ports/token.port';
import { Inject } from '@nestjs/common';
import { PASSWORD_HASHER } from '../../ports/password-hasher.port';
import type { PasswordHasherPort } from '../../ports/password-hasher.port';

export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(TOKEN) private readonly tokenPort: TokenPort,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasherPort
  ) {}

  async execute(dto: LoginDto) {
    // 1. Load user
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    // 2. Verify password (bcrypt compare via port)
    const passwordValid = await this.passwordHasher.compare(
      dto.password,
      user.getPasswordHash()
    );

    if (!passwordValid) {
      throw new InvalidCredentialsError();
    }

    const userId = user.getId();
    // 3. Generate tokens (infrastructure via port)
    const accessToken = this.tokenPort.generateAccessToken({
      userId: userId,
    });

    const refreshToken = this.tokenPort.generateRefreshToken({
      userId: userId,
    });

    // 4. Return result
    return {
      userId: userId,
      accessToken,
      refreshToken,
    };
  }
}
