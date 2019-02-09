import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Preparation } from '../../common/interfaces/preparation.interface';
import { Hospital } from '../../common/interfaces/hospital.interface';
import * as moment from 'moment';

@Injectable()
export class PreparationsService {
  constructor(
    // inject the module scoped (in the preparation.module.ts) into preparationModel
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
  ) {}

  // async create(
  //   createPreparationDto: CreatePreparationDto,
  // ): Promise<Preparation> {
  //   // create a model based on createPreparationDto)
  //   const createdPreparation = new this.preparationModel(createPreparationDto);
  //   return await createdPreparation.save();
  // }

  async getPreparations(hospitalId: Types.ObjectId) {
    // TODO TO COMMENT
    const now = moment().startOf('day');
    const query = {
      hospital: hospitalId,
      date: {
        $gte: now.toDate(),
        $lt: moment(now)
          .add(31, 'days')
          .endOf('day')
          .toDate(),
      },
    };
    return await this.preparationModel.find(query).exec();
  }
}
