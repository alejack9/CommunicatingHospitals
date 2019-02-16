import { Types } from 'mongoose';
import { PreparationType } from '../preparation.type';
import { IsDateString } from 'class-validator';

export class CreatePreparationDto {
  type: PreparationType;
  numberOfPreparations: number;
  @IsDateString()
  date: Date;
  hospital: Types.ObjectId;
}
