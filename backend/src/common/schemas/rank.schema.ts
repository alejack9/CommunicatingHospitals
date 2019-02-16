import * as mongoose from 'mongoose';

const RankSchema = new mongoose.Schema({
  rank: Number,
  period: String,
  lastUpdate: Date,
});

export { RankSchema };
