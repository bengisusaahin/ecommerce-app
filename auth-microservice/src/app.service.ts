import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtPayload } from './utils/types';
import { LoginDto } from './dto/login.dto';
import { firstValueFrom } from 'rxjs';
import { UserDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USERS_MICROSERVICE') private usersMicroservice: ClientProxy,
  ) { }

  async validateUser(email: string, password: string) {
    const plainUser: UserDto = await firstValueFrom(
      this.usersMicroservice.send(
        {
          cmd: 'Users.FindByEmail',
        },
        { email },
      ),
    );

    const user = plainToInstance(UserDto, plainUser, { excludeExtraneousValues: true });

    if (!user || user.password !== password) {
      throw new RpcException({
        status: 'error',
        message: 'Invalid credentials'
      });
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new RpcException({
        status: 'error',
        message: 'User not found'
      });
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }),
    };
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new RpcException({
        status: 'error',
        message: 'Invalid token'
      });
    }
  }
}
