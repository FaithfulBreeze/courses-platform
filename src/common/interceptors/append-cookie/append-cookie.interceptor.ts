import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppendCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(({ token, message, user }) => {
      const response: Response = context.switchToHttp().getResponse()
      response.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
      response.json({ message, user })
    }));
  }
} 