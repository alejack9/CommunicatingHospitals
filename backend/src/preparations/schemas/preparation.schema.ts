import * as mongoose from 'mongoose';

const PreparationSchema = new mongoose.Schema({
  type: String,
  numberOfPreparations: Number,
  data: mongoose.Schema.Types.Date,
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
});

export { PreparationSchema };
