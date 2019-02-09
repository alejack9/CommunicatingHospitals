import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../../common/interfaces/hospital.interface';
import * as moment from 'moment';
import { PreparationType } from 'src/common/preparation-type';
import { Preparation } from 'src/common/interfaces/preparation.interface';
import { CreatePreparationDto } from 'src/common/dtos/create-preparation.dto';

@Injectable()
export class PreparationsService {
  constructor(
    // inject the module scoped (in the preparation.module.ts) into preparationModel
    @InjectModel('Hospital')
    private readonly hospitalModel: Model<Hospital>,
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
  ) {}

  async create(
    createPreparationDto: CreatePreparationDto,
  ): Promise<Preparation> {
    return await new this.preparationModel(createPreparationDto).save(err => {
      if (err) {
        throw err;
      }
    });
  }

  async getPreparations(
    hospitalId: Types.ObjectId,
    pType: PreparationType,
  ): Promise<[Preparation]> {
    const now = moment().startOf('day');
    return (await this.hospitalModel
      .findById(hospitalId)
      .populate(
        'preparations',
        'numberOfPreparations date type',
        this.preparationModel,
        {
          type: pType,
          date: {
            $gte: now.toDate(),
            $lt: moment(now)
              .add(31, 'days')
              .endOf('day')
              .toDate(),
          },
        },
      )
      .exec()).preparations;
  }
}
