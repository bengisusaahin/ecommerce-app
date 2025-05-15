import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { AUTH_PATTERNS } from './utils/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: AUTH_PATTERNS.Login })
  async login(@Payload() loginDto: LoginDto) {
    return this.appService.login(loginDto);
  }

  @MessagePattern({ cmd: AUTH_PATTERNS.Verify })
  async verify(@Payload() token: string) {
    return this.appService.verify(token);
  }

}
