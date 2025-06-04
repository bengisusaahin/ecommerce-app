import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@ecommerce/types';
import { ClientProxy } from '@nestjs/microservices';
import { USER_PATTERNS } from '@ecommerce/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await firstValueFrom(
      this.userClient.send({ cmd: USER_PATTERNS.FindOne }, payload.sub)
    );

    if (!user) throw new UnauthorizedException();
    return user;
  }
} 