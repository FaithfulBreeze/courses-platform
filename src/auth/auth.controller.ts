import {
  Controller,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  Get,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AppendCookieInterceptor } from 'src/common/interceptors/append-cookie/append-cookie.interceptor';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { User } from 'src/common/decorators/user/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  @UseInterceptors(AppendCookieInterceptor)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('refresh')
  @UseInterceptors(AppendCookieInterceptor)
  @UseGuards(AuthGuard)
  refresh(@User() id: number) {
    return this.authService.refresh(id);
  }
}
