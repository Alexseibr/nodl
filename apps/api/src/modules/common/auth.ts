import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestUser, Role } from '../order-os/types';
import { OrderOsService } from '../order-os/order-os.service';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private readonly orderService: OrderOsService, private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userId = req.header('x-user-id');
    if (!userId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }

    const user = this.orderService.findUser(userId);
    if (!user || !user.active) {
      throw new UnauthorizedException('User not found or inactive');
    }

    const requestUser: RequestUser = { id: user.id, companyId: user.companyId, role: user.role };
    req.user = requestUser;

    const allowedRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (allowedRoles?.length && !allowedRoles.includes(requestUser.role)) {
      throw new ForbiddenException('Insufficient role permissions');
    }

    return true;
  }
}

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): RequestUser => {
  return ctx.switchToHttp().getRequest().user;
});
