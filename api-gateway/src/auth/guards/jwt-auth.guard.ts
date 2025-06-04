import { Injectable, ExecutionContext, UnauthorizedException, CanActivate, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_PATTERNS } from '@ecommerce/types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_MICROSERVICE') private readonly authMicroservice: ClientProxy
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Missing Authorization header');
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const user = await firstValueFrom(
                this.authMicroservice.send({ cmd: AUTH_PATTERNS.Verify}, token),
            );
            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
