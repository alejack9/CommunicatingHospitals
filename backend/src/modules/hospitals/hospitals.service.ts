import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { GeoJSONDto } from '../../common/dtos/geojson-point.dto';
import { PreparationType } from '../../common/preparation-type';
import { CreateHospitalDto } from '../../common/dtos/create-hospital.dto';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectModel('Hospital') private readonly hospitalModel: Model<Hospital>,
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
            _id: hospitalId,
          },
        },
        {
          $project: {
            preparations: 1,
          },
        },
        {
          $unwind: {
            path: '$preparations',
          },
        },
        {
          $lookup: {
            from: 'preparations',
            localField: 'preparations',
            foreignField: '_id',
            as: 'preparations',
          },
        },
        {
          $project: {
            type: '$preparations.type',
          },
        },
        {
          $unwind: {
            path: '$type',
          },
        },
        {
          $group: {
            _id: '$type',
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $group: {
            _id: 0,
            preparations: {
              $push: {
                type: '$_id',
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            preparations: '$preparations.type',
          },
        },
      ];
      return (await this.hospitalModel.aggregate(query).exec())[0].preparations;
    }
  }
  /**
   * @description According to this article ( https://jkchu.com/2016/02/17/designing-and-implementing-a-ranking-algorithm/ ),
   *  I've decided to implement the ranking as a query because of low-impact and relatively semplicity.
   *  A better way could be writing the ranking table in a collection and retrive it from a query, updating it every days or, in an even better way,
   *  scheduling a trigger that reacts to the 'hospitals' and 'preparations' collections.
   */
  async getRank() {
    const query = [
      // resolving the prearations (like a merge)
      {
        $lookup: {
          from: 'preparations',
          localField: 'preparations',
          foreignField: '_id',
          as: 'preparations',
        },
      },
      // removing unused filed (_id, coordinates and __v)
      {
        $project: {
          _id: 0,
          coordinates: 0,
          __v: 0,
        },
      },
      // splitting preparations array
      {
        $unwind: {
          path: '$preparations',
        },
      },
      // keeping the hospital name and renaming the preparations field in "preparation"
      {
        $project: {
          name: 1,
          preparation: '$preparations',
        },
      },
      // getting all preparations bw/ the dates
      {
        $match: {
          'preparation.date': {
            $gte: new Date('Sat, 09 Feb 2019 00:00:00 GMT'),
            $lte: new Date('Tue, 12 Feb 2019 00:00:00 GMT'),
          },
        },
      },
      // grouping the results by hospital name and calculating the number of preparations
      {
        $group: {
          _id: '$name',
          tot: {
            $sum: '$preparation.numberOfPreparations',
          },
        },
      },
      // dividing the number of preparations per the number of days in the range
      {
        $project: {
          average: {
            $divide: ['$tot', 4],
          },
        },
      },
      // sorting by the average of preparations
      {
        $sort: {
          average: -1,
        },
      },
      // grouping all in an array
      {
        $group: {
          _id: 0,
          hospitals: {
            $push: {
              name: '$_id',
              average: '$average',
            },
          },
        },
      },
      // rimoving usused _id field
      {
        $project: {
          _id: 0,
        },
      },
      // splitting the arrays element. The index value is the ranking.
      {
        $unwind: {
          path: '$hospitals',
          includeArrayIndex: 'ranking',
        },
      },
    ];
    this.hospitalModel.aggregate(query).exec();
  }
}
