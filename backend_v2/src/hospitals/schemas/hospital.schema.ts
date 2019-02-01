import * as mongoose from 'mongoose';
import { FeatureSchema } from './geoJSONFeature.schema';

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: { type: FeatureSchema, required: true },
  preparations: [
    {
      required: false,
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Preparation' },
    },
  ],
});

export { HospitalSchema };
