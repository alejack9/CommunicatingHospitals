import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { GeoJSONDto } from '../../common/dtos/geojson-point.dto';
import { PreparationType } from '../../common/preparation.type';
import { CreateHospitalDto } from '../../common/dtos/create-hospital.dto';
import { Preparation } from '../../common/interfaces/preparation.interface';

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
  // async getPreparationsTypes(
  //   hospitalId: Types.ObjectId,
  // ): Promise<PreparationType[]> {
  //   if (Types.ObjectId.isValid(hospitalId)) {
  //     const query = [
  //       {
  //         $match: {
  //           _id: hospitalId,
  //         },
  //       },
  //       {
  //         $project: {
  //           preparations: 1,
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: '$preparations',
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'preparations',
  //           localField: 'preparations',
  //           foreignField: '_id',
  //           as: 'preparations',
  //         },
  //       },
  //       {
  //         $project: {
  //           type: '$preparations.type',
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: '$type',
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: '$type',
  //         },
  //       },
  //       {
  //         $sort: {
  //           _id: 1,
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: 0,
  //           preparations: {
  //             $push: {
  //               type: '$_id',
  //             },
  //           },
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 0,
  //           preparations: '$preparations.type',
  //         },
  //       },
  //     ];
  //     return (await this.hospitalModel.aggregate(query).exec())[0].preparations;
  //   }
  // }
}
