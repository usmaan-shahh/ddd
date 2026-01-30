//Importing Value Objects.
import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';
import { UserId } from '../value-objects/user-id';

 export class User {

   /*------Private Constructor------*/
   private constructor(
     private readonly id: UserId,
     private email: Email,
     private password: Password,
     private isDeleted: boolean,
     private readonly createdAt: Date,
     private updatedAt: Date,
   ) {}

   /*------Factory Method:------*/
   /*CREATE NEW USER*/
   static create(props: {
    email: string;
    password: string;
  }): User {
  
    const email = Email.create(props.email);
    const password = Password.create(props.password);
  
    return new User(UserId.create(), email, password, false, new Date(), new Date());
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
     this.isDeleted = true;
     this.touch();
   }
   getId(): string {
     return this.id.value;
   }
   getEmail(): string {
     return this.email.value;
   }
   getPassword(): string {
     return this.password.value;
   }
   isAccountDeleted(): boolean {
     return this.isDeleted;
   }
   getCreatedAt(): Date {
     return this.createdAt;
   }
   getUpdatedAt(): Date {
     return this.updatedAt;
   }
   
 }
 