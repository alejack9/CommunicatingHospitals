import { Model } from 'mongoose';
import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from './interfaces/hospital.interface';
import { GeoJSONDto } from './dto/geojson-point.dto';

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
    return await this.hospitalModel.find().exec();
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
}
