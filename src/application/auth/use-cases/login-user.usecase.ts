import { UserRepository } from '../../../domains/users/repository/user.repository';
import { LoginDto } from '../../dto/login.dto';
import { InvalidCredentialsError } from 'src/domains/users/errors/invalid-credentials.error';
import { TokenPort } from '../../ports/token.port';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenPort: TokenPort
  ) {}

  async execute(dto: LoginDto) {
    // 1. Load user
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    // 2. Verify password (domain responsibility)
    const passwordValid = user.password.compare(dto.password);

    if (!passwordValid) {
      throw new InvalidCredentialsError();
    }

    // 3. Generate tokens (infrastructure via port)
    const accessToken = this.tokenPort.generateAccessToken({
      userId: user.id.value,
    });

    const refreshToken = this.tokenPort.generateRefreshToken({
      userId: user.id.value,
    });

    // 4. Return result
    return {
      userId: user.id.value,
      accessToken,
      refreshToken,
    };
  }
}
