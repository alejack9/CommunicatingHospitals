// TODO TO DELETE
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthService } from '../auth.service';

// /**
//  * @deprecated It tests the scope but we don't care about that, it was used to understand the auth0 workflow
//  */
// @Injectable()
// export class AdminGuard implements CanActivate {
//   constructor(private readonly authService: AuthService) {}
//   canActivate(context: ExecutionContext): boolean {
//     const user: string[] =
//       context.getArgs()[0].user['http://localhost:3000/roles'] || '';
//     return user.indexOf('admin') > -1;
//   }
// }
