import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { DateUnit, DateUnitsArray } from '../date-unit.type';

@Injectable()
export class DateUnitPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || DateUnitsArray.indexOf(value) === -1) {
      throw new BadRequestException();
    }
    return value as DateUnit;
  }
}
