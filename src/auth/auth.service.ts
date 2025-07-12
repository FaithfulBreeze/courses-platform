import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const foundUser = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!foundUser) throw new NotFoundException('User not found');
    const passwordMatch = await this.bcryptService.compare(
      foundUser.password,
      loginDto.password,
    );
    if (!passwordMatch) throw new BadRequestException('Invalid credentials');

    const { password, ...user } = foundUser;
    return {
      user,
      message: 'Login successful',
      token: this.jwtService.sign(
        { id: user.id },
        { secret: this.configService.get<string>('JWT_SECRET') },
      ),
    };
  }
}
