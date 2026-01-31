import { Email, Password, UserId } from '../value-objects';


interface CreateUserProps {
  id?: UserId;
  email: Email;
  password: Password;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
 export class User {


   /*------Private Constructor------*/
   private constructor(
    private readonly id: UserId,
    private email: Email,
    private password: Password,
    private isVerified: boolean,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

   /*------Factory Method:------*/
   /*CREATE NEW USER*/
   static create(props: CreateUserProps): User {
    return new User(
      props.id ?? UserId.create(),
      props.email,
      props.password,
      props.isVerified ?? false,
      props.createdAt ?? new Date(),
      props.updatedAt ?? new Date(),
    );
  }
   //UTILITY METHOD TO UPDATE TIMESTAMP
   private touch(): void {
     this.updatedAt = new Date();
   }

   /*------domain method's :------*/
   //UPDATE PASSWORD
   updatePassword(password: Password): void {
     this.password = password;
     this.touch();
   }
   
   // DELETE ACCOUNT
   delete(): void {
     this.isVerified = false;
     this.touch();
   }
   getId(): string {
     return this.id.value;
   }
   getEmail(): string {
     return this.email.value;
   }
   getPasswordHash(): string {
    return this.password.value;
  }
   isAccountVerified(): boolean {
     return this.isVerified;
   }
   getCreatedAt(): Date {
     return this.createdAt;
   }
   getUpdatedAt(): Date {
     return this.updatedAt;
   }
   
 }
 