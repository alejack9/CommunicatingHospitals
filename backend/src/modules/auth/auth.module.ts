import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './guards/user.guard';
import { UserModule } from '../user/user.module';

/**
 * @classdesc Responsable of the user validation
 */
@Module({
  imports: [UserModule],
  providers: [
    // the "core" of the validation: UserGuard contains the policy that makes an user able to get the information
    // putting the UserGuard here instead of in any single method of controllers makes UserGuard global and, more important,
    // enables the UserGuard to use imported modules (such as UserService in UserModule)
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
})
export class AuthModule {}
