import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * @deprecated It tests the scope but we don't care about that, it was used to understand the auth0 workflow
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user: string[] =
      context.getArgs()[0].user['http://localhost:3000/roles'] || '';
    return user.indexOf('admin') > -1;
  }
}
