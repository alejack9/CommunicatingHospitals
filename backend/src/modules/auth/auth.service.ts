// import { Injectable } from '@nestjs/common';
// import { User } from 'src/common/interfaces/user.interface';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';

// @Injectable()
// export class AuthService {
//   constructor(@InjectModel('User') private readonly user: Model<User>) {}
//   async isValidUser(id: string) {
//     return !!(await this.user.findOne({ authId: id }).exec());
//   }
// }
