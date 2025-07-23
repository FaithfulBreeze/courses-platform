import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { BcryptService } from '../../../bcrypt/bcrypt.service';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encoderService: BcryptService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    const jwtToken = cookies.jwt;

    if (!jwtToken) throw new UnauthorizedException();
    let id: number;
    try {
      const data = this.jwtService.verify(jwtToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const foundUser = await this.dataSource.manager.findOne(User, {
        where: {
          id: data.id,
        },
      });

      if (!foundUser) throw new UnauthorizedException('User not found');
      if (!foundUser.accessToken)
        throw new UnauthorizedException('You must be logged to access this resource');

      const match = await this.encoderService.compare(foundUser.accessToken, jwtToken);

      if (!match) {
        throw new UnauthorizedException('You have been disconnected from this device');
      }

      id = data.id;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    request.user = id;

    return true;
  }
}
