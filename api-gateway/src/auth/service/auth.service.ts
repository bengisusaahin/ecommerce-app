import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS } from '../utils/types';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authMicroservice: ClientProxy,
    ) { }

    async login(loginDto: LoginDto) {
        return await firstValueFrom(
            this.authMicroservice.send({ cmd: AUTH_PATTERNS.Login}, loginDto),
        );
    }
}
