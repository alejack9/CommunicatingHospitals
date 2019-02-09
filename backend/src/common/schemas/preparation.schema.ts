import { Schema } from 'mongoose';
import { PreparationTypes } from '../preparationTypes';

const PreparationSchema = new Schema({
  type: {
    type: Schema.Types.String,
    enum: PreparationTypes,
    required: true,
  },
  numberOfPreparations: {
    type: Schema.Types.Number,
    required: true,
  },
  date: Schema.Types.Date,
  // ref or embedded? ref: we don't need hospital almost never
  // hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' },
});

export { PreparationSchema };
