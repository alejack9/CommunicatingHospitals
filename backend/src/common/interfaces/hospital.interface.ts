import { Document } from 'mongoose';
import { Preparation } from './preparation.interface';
import { GeoJSONMultiPoint } from './geoJSONMultiPoint.interface';
import { Rank } from './rank.interface';

export interface Hospital extends Document {
  readonly name: string;
  readonly coordinate: GeoJSONMultiPoint;
  readonly preparations: [Preparation];
  readonly averageRanks: [Rank];
}
