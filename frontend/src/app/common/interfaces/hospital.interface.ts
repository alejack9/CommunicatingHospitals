import { Preparation } from './preparation.interface';
import { GeoJSONMultiPoint } from './geoJSONMultiPoint.interface';
import { Rank } from './rank.interface';

export interface Hospital {
  readonly name: string;
  readonly coordinate: GeoJSONMultiPoint;
  readonly preparations: [Preparation] | undefined;
  readonly averageRanks: [Rank] | undefined;
}
