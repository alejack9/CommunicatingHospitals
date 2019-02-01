import { Document } from 'mongoose';

export interface GeoJSOFeature extends Document {
  readonly type: string;
  readonly geometry: { type: string; coordinates: [number] };
  readonly properties: {};
}
