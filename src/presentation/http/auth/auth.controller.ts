import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserUseCase, RegisterUserUseCase } from '../../../application/auth/auth.use-cases';
import { LoginRequestDto, RegisterRequestDto } from './dto/auth-request.dto';
  
  @Controller('auth')
  export class AuthController {

    constructor(
      private readonly loginUserUseCase: LoginUserUseCase,  
      private readonly registerUserUseCase: RegisterUserUseCase,
    ) {}
  
    // (1) Register user
    @Post('register')
    async register(@Body() body: RegisterRequestDto) {
      return await this.registerUserUseCase.execute(body);
    }
  
    // (2) Login user
        @Post('login')
        async login(@Body() body: LoginRequestDto) {
        return await this.loginUserUseCase.execute(body);
    }
  }
  