import { Schema } from 'mongoose';
import { PreparationTypesArray } from '../preparation-type';

const PreparationSchema = new Schema({
  type: {
    type: Schema.Types.String,
    enum: PreparationTypesArray,
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
