import * as mongoose from 'mongoose';
import { GeoJSONMultiPointSchema } from './geoJSONMultiPoint.schema';

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: { type: GeoJSONMultiPointSchema, required: true },
  preparations: [
    {
      required: false,
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Preparation' },
    },
  ],
});

export { HospitalSchema };
