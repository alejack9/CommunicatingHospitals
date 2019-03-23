import { Injectable, HttpService } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as jwtDecode from 'jwt-decode';
import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly user: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  private managementToken: string;

  async getHospitalID(pAuthId: string): Promise<Types.ObjectId> {
    // retrive the hospital's id from the passed userId
    return (await this.user
      .findOne({ authId: pAuthId })
      .select('')
      .exec()).hospital as Types.ObjectId;
  }

  async getUser(authId: string) {
    return await this.user.findOne({ authId }).exec();
  }

  async getUserHospital(authId: string) {
    return await this.user
      .findById((await this.getUser(authId))._id)
      .populate('hospital')
      .exec();
  }

  private async getManagementToken() {
    return (await this.httpService
      .post(
        `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
          client_id: process.env.AUTH0_MANAGEMENT_CLIENTID,
          client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
          audience: process.env.AUTH0_MANAGEMENT_AUD,
          grant_type: 'client_credentials',
        },
        {
          headers: { 'content-type': 'application/json' },
        },
      )
      .toPromise()).data.access_token;
  }

  async getLinkedinToken(authId: string) {
    if (
      !this.managementToken ||
      jwtDecode(this.managementToken).exp < new Date()
    ) {
      this.managementToken = await this.getManagementToken();
    }
    return (await this.httpService
      .get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${authId}`, {
        headers: { authorization: `Bearer ${this.managementToken}` },
      })
      .toPromise()).data.identities[0].access_token;
  }
}
