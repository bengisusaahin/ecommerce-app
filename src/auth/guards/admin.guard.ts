import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.body;

    if (user?.role === 2 || user.role === 3) {
      return true;
    }

    throw new ForbiddenException('Only admins and super admins can access this resource.');
  }
}