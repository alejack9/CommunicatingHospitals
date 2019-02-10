import { Types } from 'mongoose';
import { GeoJSONMultiPoint } from '../interfaces/geoJSONMultiPoint';

export class CreateHospitalDto {
  name: string;
  coordinates: GeoJSONMultiPoint;
  preparations: [Types.ObjectId];
}
