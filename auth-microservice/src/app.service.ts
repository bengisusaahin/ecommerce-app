import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtPayload, LoginDto, USER_PATTERNS, UserDto, UserResponseDto } from '@ecommerce/types';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USERS_MICROSERVICE') private usersMicroservice: ClientProxy,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await firstValueFrom(this.usersMicroservice.send({ cmd: USER_PATTERNS.FindByEmail }, { email }));

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    const { password: _, ...safeUser } = user;

    return new UserResponseDto(safeUser);
  }


  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new RpcException({
        status: 'error',
        message: 'Invalid email or password',
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
