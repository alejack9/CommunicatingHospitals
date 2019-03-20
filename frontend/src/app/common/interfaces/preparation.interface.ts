import { PreparationType } from './preparationType.interface';
import { Hospital } from './hospital.interface';

export interface Preparation {
  readonly numberOfPreparations: number;
  readonly date: Date;
  readonly type: PreparationType;
  readonly hospital: Hospital;
}
