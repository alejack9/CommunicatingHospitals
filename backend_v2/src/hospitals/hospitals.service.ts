import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from './interfaces/hospital.interface';
import { CreateHospitalDto } from './dto/create-hospital.dto';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectModel('Hospital') private readonly hospitalModel: Model<Hospital>,
  ) {}

  async create(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
    const createdHospital = new this.hospitalModel(createHospitalDto);
    return await createdHospital.save();
  }

  async findAll(): Promise<Hospital[]> {
    return await this.hospitalModel.find().exec();
  }
}
