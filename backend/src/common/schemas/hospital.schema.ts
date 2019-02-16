import * as mongoose from 'mongoose';
import { GeoJSONMultiPointSchema } from './geoJSONMultiPoint.schema';
import { RankSchema } from './rank.schema';

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: { type: GeoJSONMultiPointSchema, required: true },
  preparations: [
    {
      // ref or embedded? ref: preparations number grows very quickly
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preparation',
      required: false,
    },
  ],
  averageRanks: [RankSchema],
});

export { HospitalSchema };
