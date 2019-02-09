import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { GeoJSONDto } from '../../common/dtos/geojson-point.dto';
import { PreparationType } from 'src/common/preparation-type';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectModel('Hospital') private readonly hospitalModel: Model<Hospital>,
  ) {}

  // async create(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
  //   const createdHospital = new this.hospitalModel(createHospitalDto);
  //   return await createdHospital.save();
  // }

  async findAll(): Promise<Hospital[]> {
    return await this.hospitalModel
      .find()
      .populate('preparations')
      .exec();
  }

  async find(geojson: GeoJSONDto, distance?: number): Promise<Hospital[]> {
    const query = {
      coordinates: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [
              geojson.coordinates.shift(),
              geojson.coordinates.shift(),
            ],
          },
          // "distance" is in kilomiters and maxDistance works in meters.
          $maxDistance: (distance || 100) * 1000,
        },
      },
    };
    return this.hospitalModel.find(query).exec();
  }

  async getPreparationTypes(
    hospitalId: Types.ObjectId,
  ): Promise<PreparationType[]> {
    if (Types.ObjectId.isValid(hospitalId)) {
      const r = (await this.hospitalModel
        .findById(hospitalId)
        .select('preparations')
        .populate('preparations', 'type')
        .exec()).preparations.map(p => p.type);
    }
    return null;
  }
}
