import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UserRole } from "src/users/utils/types";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.body;

    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    throw new ForbiddenException('Only admins and super admins can access this resource.');
  }
}