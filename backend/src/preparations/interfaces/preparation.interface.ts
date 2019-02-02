import { Document } from 'mongoose';

export interface Preparation extends Document {
  readonly numberOfPreparations: number;
  readonly date: Date;
  readonly type: string;
}
