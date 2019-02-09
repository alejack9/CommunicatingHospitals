import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  Min,
  Validate,
  IsString,
  IsOptional,
  Equals,
} from 'class-validator';
import { CoordinatesValidator } from '../validators/coordinates-validator';

export class GeoJSONDto {
  @IsOptional()
  @IsString()
  @Equals('Point')
  type: string = 'Point';

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Validate(CoordinatesValidator)
  // long, lat
  coordinates: [number];

  @IsOptional()
  @IsNumber()
  @Min(0)
  distance: number = 100;
}
