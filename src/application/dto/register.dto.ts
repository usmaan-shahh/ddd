
export interface RegisterDto {
  email: string;
  password: string;
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