import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Preparation } from 'src/common/interfaces/preparation.interface';
import * as moment from 'moment';
import { PreparationType } from 'src/common/preparation-type';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel('Preparation')
    private readonly preparationModel: Model<Preparation>,
  ) {}
  async rank(
    pType: PreparationType,
    dates: Date[],
    hospitalID?: Types.ObjectId,
  ) {
    const momFrom = moment(dates[0]).startOf();
    const momTo = moment(dates[1]).endOf();
    const query = [
      {
        $match: {
          type: pType,
          date: {
            $gte: momFrom.toDate(),
            $lte: momTo.toDate(),
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
            $divide: ['$tot', momTo.diff(momFrom, 'day') + 1],
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
    const toReturn = this.preparationModel.aggregate(query);
    if (!hospitalID) {
      return await toReturn.exec();
    }
    return await toReturn
      .match({
        _id: hospitalID,
      })
      .exec();
  }
}
