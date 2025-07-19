import {
  Controller,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AppendCookieInterceptor } from 'src/common/interceptors/append-cookie/append-cookie.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  @UseInterceptors(AppendCookieInterceptor)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
