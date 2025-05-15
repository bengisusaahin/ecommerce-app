import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from './utils/types';
import { LoginDto } from './dto/login.dto';
import { firstValueFrom } from 'rxjs';
import { UserDto } from './dto/user-response.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USERS_MICROSERVICE') private usersMicroservice: ClientProxy,
  ) { }

  async validateUser(email: string, password: string) {
    const user: UserDto = await firstValueFrom(
      this.usersMicroservice.send(
        {
          cmd: 'Users.FindByEmail',
        },
        email,
      ),
    );
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
