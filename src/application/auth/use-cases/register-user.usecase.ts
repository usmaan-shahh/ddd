import { UserRepository } from '../../../domains/users/repository/user.repository';
import { RegisterDto } from '../../dto/register.dto';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { User } from '../../../domains/users/entity/user.entity';
import { EmailAlreadyExistsError } from '../../../domains/users/errors/email-already-exists.error';


export class RegisterUserUseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasherPort
  ) {}

  async execute(body: RegisterDto) {

    // (1) primitives only
    const exists = await this.userRepository.findByEmail(body.email);
  
    if (exists) {
      throw new EmailAlreadyExistsError();
    }
  
    // (2) hash password
    const hashedPassword = await this.passwordHasher.hash(body.password);
  
    // (3) domain decides everything
    const user = User.create({
      email: body.email,
      password: hashedPassword,
    });
  
    // (4) persist
    await this.userRepository.save(user);
  
    return {
      userId: user.getId(),
    };
  }
  
}
