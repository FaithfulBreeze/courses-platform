import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    const jwtToken = cookies.jwt;
    if (!jwtToken) throw new UnauthorizedException();
    let id: number;
    try {
      const data = this.jwtService.verify(jwtToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      id = data.id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    request.user = id;
    return true;
  }
}
