import { GeoType } from '../interfaces/geoJSONMultiPoint';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  Min,
  Validate,
} from 'class-validator';
import { CoordinatesValidator } from './validators/coordinates-validator';

export class GeoJSONDto {
  type: GeoType = 'Point';

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Validate(CoordinatesValidator)
  // long, lat
  coordinates: [number];

  @IsNumber()
  @Min(0)
  distance: number = 100;
}
