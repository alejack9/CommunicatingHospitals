import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Preparation } from '../../common/interfaces/preparation.interface';
import * as moment from 'moment';
import { PreparationType } from '../../common/preparation.type';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { PreparationTypesArray } from '../../common/preparation.type';
import { DateUnit, DateUnitsArray } from '../../common/date-unit.type';
import { TypeRank } from '../../common/interfaces/type-rank.interfaces';
import { HospitalsService } from '../hospitals/hospitals.service';
import { Rank } from '../../common/interfaces/rank.interface';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
    @InjectModel('Hospital')
    private readonly hospitalModel: Model<Hospital>,
    @InjectModel('Rank')
    private readonly rankModel: Model<Rank>,
  ) {}

  /**
   * @description According to this article ( https://jkchu.com/2016/02/17/designing-and-implementing-a-ranking-algorithm/ ),
   *  I've decided to implement the ranking as a query because of low-impact and relatively semplicity.
   *  A better way could be to write the ranking table in a collection and retrive it from a simpler query, updating it every day or,
   *  in an even better way scheduling a trigger that reacts to the 'hospitals' and 'preparations' collections.
   */
  async getTypeRank(
    pType: PreparationType,
    dateUnit: DateUnit,
    hospitalID?: Types.ObjectId,
  ): Promise<[TypeRank]> {
    let query: any[];
    switch (dateUnit) {
      case 'day':
        query = this.getRanksQuery(
          moment(Date.now()).startOf('day'),
          moment(Date.now()).endOf('day'),
          pType,
        );
        break;
      case 'month':
        query = this.getRanksQuery(
          moment(Date.now()).startOf('month'),
          moment(Date.now()).endOf('month'),
          pType,
        );
        break;
      case 'year':
        query = this.getRanksQuery(
          moment(Date.now()).startOf('year'),
          moment(Date.now()).endOf('year'),
          pType,
        );
        break;
      default:
        throw new Error(`'${dateUnit}' unknown`);
    }
    if (hospitalID) {
      query.push({ $match: { _id: hospitalID } });
    }
    return await this.preparationModel.aggregate(query).exec();
  }

  async getAverageRank(dateUnit: DateUnit, hospitalId: Types.ObjectId) {
    return (await this.hospitalModel
      .findById(hospitalId, 'averageRanks')
      .exec()).averageRanks.find(r => r.period === dateUnit);
  }

  /**
   * @description It sets the average hospitals' ranks
   * @param dateUnit the date unit to calculate
   */
  async setAverageRanks() {
    const hospitalsMap: Map<string, Map<DateUnit, number[]>> = new Map();
    // const start = Date.now();
    for (const type of PreparationTypesArray) {
      for (const dateUnit of DateUnitsArray) {
        for (const rankingEntry of await this.getTypeRank(type, dateUnit)) {
          if (hospitalsMap.has(rankingEntry._id.toHexString())) {
            if (
              hospitalsMap.get(rankingEntry._id.toHexString()).has(dateUnit)
            ) {
              hospitalsMap
                .get(rankingEntry._id.toHexString())
                .get(dateUnit)
                .push(rankingEntry.ranking);
            } else {
              hospitalsMap
                .get(rankingEntry._id.toHexString())
                .set(dateUnit, [rankingEntry.ranking]);
            }
          } else {
            hospitalsMap.set(
              rankingEntry._id.toHexString(),
              new Map([[dateUnit, [rankingEntry.ranking]]]),
            );
          }
        }
      }
    }
    for (const hospitalEntry of hospitalsMap) {
      const vals = new Array();
      for (const periodValues of hospitalEntry[1]) {
        const rank = new this.rankModel();
        rank._id = null;
        rank.period = periodValues[0];
        rank.rank = Math.ceil(
          periodValues[1].reduce((a, b) => a + b) / periodValues[1].length,
        );
        rank.lastUpdate = new Date(Date.now());
        vals.push(rank);
      }
      await this.hospitalModel
        .findByIdAndUpdate(Types.ObjectId(hospitalEntry[0]), {
          averageRanks: vals,
        })
        .exec();
    }
    // console.log(Date.now() - start);
    return true;
  }

  private getRanksQuery(
    start: moment.Moment,
    end: moment.Moment,
    pType,
  ): any[] {
    return [
      {
        $match: {
          type: pType,
          date: {
            $gte: start.toDate(),
            $lte: end.toDate(),
          },
        },
      },
      {
        $group: {
          _id: '$hospital',
          tot: {
            $sum: '$numberOfPreparations',
          },
        },
      },
      {
        $project: {
          media: {
            $divide: ['$tot', end.diff(start, 'day') + 1],
          },
        },
      },
      {
        $sort: {
          media: -1,
        },
      },
      {
        $group: {
          _id: 0,
          hospitals: {
            $push: {
              hospId: '$_id',
              media: '$media',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $unwind: {
          path: '$hospitals',
          includeArrayIndex: 'ranking',
        },
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitals.hospId',
          foreignField: '_id',
          as: 'hospitals.hospName',
        },
      },
      {
        $project: {
          _id: '$hospitals.hospId',
          name: '$hospitals.hospName.name',
          media: '$hospitals.media',
          ranking: 1,
        },
      },
      {
        $unwind: {
          path: '$name',
        },
      },
    ];
  }
}
