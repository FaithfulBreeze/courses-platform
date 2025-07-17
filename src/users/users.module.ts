import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { Queries } from './queries';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    UsersResolver,
    UsersService,
    BcryptService,
    JwtService,
    ...Queries,
  ],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
