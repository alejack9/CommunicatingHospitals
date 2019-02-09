import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from '../../../common/interfaces/user.interface';
// import { AuthService } from '../auth.service';

/**
 * @classdesc It checks if the logged user exists in the users's collection
 */
@Injectable()
export class UserGuard implements CanActivate {
  // UserService is exported by UserModule
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // context.getArgs()[0].user.sub contains the user's auth0 id
    // NOTE: an 'attacker' cannot change the id becase the signature guarantees integrity
    return !!(await this.userService.getUser(context.getArgs()[0].user.sub));
  }
}
