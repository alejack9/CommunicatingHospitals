import * as mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['feautre'],
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  properties: {},
});

export { FeatureSchema };
