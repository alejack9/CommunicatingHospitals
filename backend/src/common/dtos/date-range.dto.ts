import {
  IsDateString,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';

export class DateRangeDto {
  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @IsDateString({ each: true })
  dates: Date[];
}
