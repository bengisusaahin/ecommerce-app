import { Inject, Injectable } from '@nestjs/common';
import { LoginDto, USER_PATTERNS } from '@ecommerce/types';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS } from '@ecommerce/types';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authMicroservice: ClientProxy,
        @Inject('USERS_MICROSERVICE')
        private readonly usersMicroservice: ClientProxy
    ) { }

    async login(loginDto: LoginDto) {
        return await firstValueFrom(
            this.authMicroservice.send({ cmd: AUTH_PATTERNS.Login }, loginDto),
        );
    }

    async verify(token: string) {
        return await firstValueFrom(
            this.authMicroservice.send({ cmd: AUTH_PATTERNS.Verify }, token),
        );
    }

    async getMe(userId: number) {
        const user = await firstValueFrom(
            this.usersMicroservice.send({ cmd: USER_PATTERNS.FindOne }, { id: userId })
        );
        return user;
    }

}
