import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../../common/interfaces/hospital.interface';
import * as moment from 'moment';
import { PreparationType } from '../../common/preparation-type';
import { Preparation } from '../../common/interfaces/preparation.interface';
import { CreatePreparationDto } from '../../common/dtos/create-preparation.dto';

@Injectable()
export class PreparationsService {
  constructor(
    // inject the module scoped (in the preparation.module.ts) into preparationModel
    @InjectModel('Hospital')
    private readonly hospitalModel: Model<Hospital>,
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
  ) {}

  async push(
    preparationID: Types.ObjectId,
    hospitalID: Types.ObjectId,
  ): Promise<Hospital> {
    // produces a false deprecation warning
    return this.hospitalModel
      .findByIdAndUpdate(hospitalID, {
        $push: { preparations: preparationID },
      })
      .exec();
  }

  async create(
    createPreparationDto: CreatePreparationDto,
  ): Promise<Preparation> {
    return await new this.preparationModel(createPreparationDto).save();
  }

  async getPreparations(
    hospitalId: Types.ObjectId,
    pType: PreparationType,
    range: Date[],
  ): Promise<[Preparation]> {
    const now = moment(range[0]).startOf('day');
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
            $lt: moment(range[1])
              .endOf('day')
              .toDate(),
          },
        },
      )
      .exec()).preparations;
  }
}
