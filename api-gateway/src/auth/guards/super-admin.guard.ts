import { UserRole } from "@ecommerce/types";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.body;

    if (user?.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    throw new ForbiddenException('Only super admins can access this resource.');
  }
}