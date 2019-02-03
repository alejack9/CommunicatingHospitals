import { Document } from 'mongoose';

// export interface GeoJSONPoint extends Document {
//   readonly type: GeoType;
//   readonly geometry: { type: GeoGeoType; coordinates: [number] };
//   readonly properties: {
//     rank: number;
//   };
// }

type MultiPoint = 'MultiPoint';
export type GeoType = MultiPoint | 'Point';

// export enum GeoType {
//   ...MultiPointEnum,
//   'Point',
// }

enum MultiPointEnum {
  'MultiPoint',
}
// export enum GeoGeoType {
//   'MultiPoint',
//   'Point',
// }

export interface GeoJSONMultiPoint extends Document {
  readonly type: MultiPointEnum;
  readonly coordinates: [[number]];
}
