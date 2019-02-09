import { Document, Types } from 'mongoose';
import { PreparationTypesEnum } from '../preparationTypes';
import { Hospital } from './hospital.interface';

export interface Preparation extends Document {
  readonly numberOfPreparations: number;
  readonly date: Date;
  readonly type: PreparationTypesEnum;
  readonly hospital: Hospital;
}
