import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user: string[] =
      context.getArgs()[0].user['http://localhost:3000/roles'] || '';
    return user.indexOf('admin') > -1;
  }
}
