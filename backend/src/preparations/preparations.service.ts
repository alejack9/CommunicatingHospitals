import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Preparation } from './interfaces/preparation.interface';

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

  async findAll(): Promise<Preparation[]> {
    return await this.preparationModel.find().exec();
  }
}
