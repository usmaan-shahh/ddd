import { User } from '../entity/user.entity';
import { Email } from '../value-objects/email';
import { UserId } from '../value-objects/user-id';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

