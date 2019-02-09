import { Document, Types } from 'mongoose';
import { Hospital } from 'src/common/interfaces/hospital.interface';

export interface User extends Document {
  readonly authId: string;
  readonly hospitalID: Types.ObjectId;
  readonly hospital: Types.ObjectId | Hospital;
}
