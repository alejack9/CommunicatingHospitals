import { PreparationType } from '../preparation.type';
import { Hospital } from './hospital.interface';

export interface Preparation extends Document {
  readonly _id: any;
  readonly numberOfPreparations: number;
  readonly date: Date;
  readonly type: PreparationType;
  readonly hospital: Hospital | Types.ObjectId;
}
