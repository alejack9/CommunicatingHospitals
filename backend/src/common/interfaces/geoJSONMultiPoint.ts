import { Document } from 'mongoose';

// export interface GeoJSONPoint extends Document {
//   readonly type: GeoType;
//   readonly geometry: { type: GeoGeoType; coordinates: [number] };
//   readonly properties: {
//     rank: number;
//   };
// }

enum Type {
  'MultiPoint',
}
export interface GeoJSONMultiPoint extends Document {
  readonly type: Type;
  readonly coordinates: [[number]];
}
