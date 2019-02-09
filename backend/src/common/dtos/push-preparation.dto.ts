import { Types } from 'mongoose';

export class PushPreparationDto {
  preparationID: Types.ObjectId;
  hospitalID: Types.ObjectId;
}
