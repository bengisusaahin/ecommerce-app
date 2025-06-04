import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { UserRole } from '@ecommerce/types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest<Request & { user: User }>();

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Bu işlem için yetkiniz bulunmamaktadır.');
        }

        return true;
    }
}