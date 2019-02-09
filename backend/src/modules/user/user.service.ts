import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User } from 'src/common/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly user: Model<User>) {}

  /**
   *
   * @param userId Could be eather objectId or authId
   */
  async getHospitalID(userId: string): Promise<Types.ObjectId> {
    // retrive the hospital's id from the passed userId
    return (Types.ObjectId.isValid(userId)
      ? (await this.user
          .findById(userId)
          .select('')
          .exec()).hospital
      : (await this.user
          .findOne({ authId: userId })
          .select('')
          .exec()).hospital) as Types.ObjectId;
  }

  async getUser(pAuthId: string) {
    return await this.user.findOne({ authId: pAuthId }).exec();
  }

  /**
   * @description We thought to 'map' the authId into the mongoDB ObjectID to keep only 1 id and decode the authId from the object's one.
   *  Although, we choose to keep 2 IDs: the mongodb' and the auth' in order to respect mongoDB best pratices (ObjectID has an own format)
   */
  // async getUser(pAuthId: string) {
  // const objectId = mongoose.Types.ObjectId(
  //   this.encode('linkedin|xJTR2xVet3') +
  //     Math.floor(Math.random() * 9).toString() +
  //     Math.floor(Math.random() * 9).toString() +
  //     Math.floor(Math.random() * 9).toString() +
  //     Math.floor(Math.random() * 9).toString(),
  // );
  // return await this.user.findById(objectId);
  // }
  // private encode(authID: string) {
  //   return this.hexEncode(authID.split('|')[1]);
  // }
  // private hexEncode(s: string) {
  //   return Buffer.from(s, 'utf8').toString('hex');
  // }
  // private decode(objectId: string) {
  //   return `linkedin|${this.hexDecode(objectId.substr(0, 20))}`;
  // }
  // private hexDecode(s: string) {
  //   return Buffer.from(s, 'hex').toString('utf8');
  // }
}
