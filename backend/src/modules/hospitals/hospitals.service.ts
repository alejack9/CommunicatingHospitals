import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from 'src/common/interfaces/hospital.interface';
import { Preparation } from 'src/common/interfaces/preparation.interface';
import { CreateHospitalDto } from 'src/common/dtos/create-hospital.dto';
import { GeoJSONDto } from 'src/common/dtos/geojson-point.dto';
import { PreparationType } from 'src/common/preparation.type';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectModel('Hospital') private readonly hospitalModel: Model<Hospital>,
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
  ) {}

  async create(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
    return await new this.hospitalModel(createHospitalDto).save(err => {
      if (err) {
        throw err;
      }
    });
  }

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

  async getPreparationsTypes(
    hospitalId: Types.ObjectId,
  ): Promise<PreparationType[]> {
    if (Types.ObjectId.isValid(hospitalId)) {
      const query = [
        {
          $match: {
            hospital: hospitalId,
          },
        },
        {
          $group: {
            _id: '$type',
          },
        },
        {
          $group: {
            _id: false,
            all: {
              $push: '$_id',
            },
          },
        },
      ];
      return (await this.preparationModel.aggregate(query).exec())[0].all;
    }
  }
}
