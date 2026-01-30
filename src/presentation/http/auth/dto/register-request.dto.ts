import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterRequestDto {
    
  @IsEmail() email: string;

  @IsString() @MinLength(8) password: string;

}


/*Client send's JSON

 request.body = {
                  "email": "hello@gmail.com",
                  "password": "hello"
                }

  @Body() body: RegisterDto

  NestJS runs internally: body = plainToInstance(RegisterDto, request.body);

  body = RegisterDto {
                  email: 'hello@gmail.com',
                  password: 'hello',
                    };

  body instanceof RegisterDto  // true

  A DTO Class defines the structure and validation rules of incoming data and ValidationPipe enforces them before the controller runs
  
*/