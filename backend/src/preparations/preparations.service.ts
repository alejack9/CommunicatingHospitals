import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Preparation } from './interfaces/preparation.interface';
import { CreatePreparationDto } from './dto/create-preparation.dto';

@Injectable()
export class PreparationsService {
  constructor(
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
  ) {}

  async create(
    createPreparationDto: CreatePreparationDto,
  ): Promise<Preparation> {
    const createdPreparation = new this.preparationModel(createPreparationDto);
    return await createdPreparation.save();
  }

  async findAll(): Promise<Preparation[]> {
    return await this.preparationModel.find().exec();
  }
}
