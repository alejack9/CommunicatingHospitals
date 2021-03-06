import { Document } from 'mongoose';

export interface GeoJSONMultiPoint extends Document {
  readonly type: 'MultiPoint';
  readonly coordinates: [[number]];
}
