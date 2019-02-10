import { Types } from 'mongoose';
import { PreparationType } from '../preparation-type';

export class CreatePreparationDto {
  type: PreparationType;
  numberOfPreparations: number;
  date: Date;
}
