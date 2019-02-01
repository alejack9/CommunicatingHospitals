import { Document } from 'mongoose';
import { GeoJSOFeature } from './geoJSONFeature';
import { Preparation } from 'src/preparations/interfaces/preparation.interface';

export interface Hospital extends Document {
  readonly name: string;
  readonly coordinate: GeoJSOFeature;
  readonly preparations: [Preparation];
}
