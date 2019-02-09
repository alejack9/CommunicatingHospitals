import { Document } from 'mongoose';
import { PreparationType } from '../preparation-type';
import { Hospital } from './hospital.interface';

export interface Preparation extends Document {
  readonly numberOfPreparations: number;
  readonly date: Date;
  readonly type: PreparationType;
  readonly hospital: Hospital;
}
