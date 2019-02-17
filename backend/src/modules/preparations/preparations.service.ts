import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Hospital } from 'src/common/interfaces/hospital.interface';
import { Preparation } from 'src/common/interfaces/preparation.interface';
import { CreatePreparationDto } from 'src/common/dtos/create-preparation.dto';
import { PreparationType } from 'src/common/preparation.type';

@Injectable()
export class PreparationsService {
  constructor(
    // inject the module scoped (in the preparation.module.ts) into preparationModel
    @InjectModel('Hospital')
    private readonly hospitalModel: Model<Hospital>,
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
  ) {}

  async addPreparation(
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
