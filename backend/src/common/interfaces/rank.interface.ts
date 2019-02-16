import { Document } from 'mongoose';

export interface Rank extends Document {
  period: string;
  rank: number;
  lastUpdate: Date;
}
