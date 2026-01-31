import type { UserRepository } from '../../../domains/users/repository/user.repository';
import { RegisterDto } from '../../dto/register.dto';
import { User } from '../../../domains/users/entity/user.entity';
import { EmailAlreadyExistsError } from '../../../domains/users/errors/email-already-exists.error';
import { Password } from 'src/domains/users/value-objects/password';
import { Email } from 'src/domains/users/value-objects/email';
import { Inject } from '@nestjs/common';
import { PASSWORD_HASHER } from '../../ports/password-hasher.port';
import type { PasswordHasherPort } from '../../ports/password-hasher.port';

export class RegisterUserUseCase {

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasherPort
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
    const email = Email.create(body.email);
    const password = Password.create(hashedPassword);
    
    const user = User.create({
      email,
      password
    });
  
    // (4) persist
    await this.userRepository.save(user);
  
    return {
      userId: user.getId(),
    };
  }
  
}
