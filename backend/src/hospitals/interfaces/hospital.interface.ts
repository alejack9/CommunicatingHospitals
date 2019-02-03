import { Document } from 'mongoose';
import { Preparation } from 'src/preparations/interfaces/preparation.interface';
import { GeoJSONMultiPoint } from './geoJSONMultiPoint';

export interface Hospital extends Document {
  readonly name: string;
  readonly coordinate: GeoJSONMultiPoint;
  readonly preparations: [Preparation];
}
