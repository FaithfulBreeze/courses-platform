import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AppendCookieInterceptor implements NestInterceptor {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly encoderService: BcryptService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async ({ token, message, user }) => {
        const response: Response = context.switchToHttp().getResponse();
        response.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        await this.dataSource.manager.transaction(async (manager) => {
          const foundUser = await manager.findOne(User, {
            where: { id: user.id },
          });

          if (!foundUser) throw new BadRequestException('User not found');
          foundUser.accessToken = await this.encoderService.encode(token);
          manager.save(foundUser);
        });

        return { message, user };
      }),
    );
  }
}
