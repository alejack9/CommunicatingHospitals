import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../../common/interfaces/hospital.interface';
import * as moment from 'moment';
import { PreparationType } from 'src/common/preparation-type';
import { Preparation } from 'src/common/interfaces/preparation.interface';

@Injectable()
export class PreparationsService {
  constructor(
    // inject the module scoped (in the preparation.module.ts) into preparationModel
    @InjectModel('Hospital')
    private readonly hospitalModel: Model<Hospital>,
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

  async getPreparations(
    hospitalId: Types.ObjectId,
    pType: PreparationType,
  ): Promise<[Preparation]> {
    // TODO TO COMMENT
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

    // const query = {
    //   hospital: hospitalId,
    //   date: {
    //     $gte: now.toDate(),
    //     $lt: moment(now)
    //       .add(31, 'days')
    //       .endOf('day')
    //       .toDate(),
    //   },
    // };
    // console.log(query);
    // return await this.hospitalModel.find(query).exec();
  }
}
