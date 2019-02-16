import { Types } from 'mongoose';
import { GeoJSONMultiPoint } from '../interfaces/geoJSONMultiPoint.interface';

export class CreateHospitalDto {
  name: string;
  coordinates: GeoJSONMultiPoint;
  preparations: [Types.ObjectId];
}
