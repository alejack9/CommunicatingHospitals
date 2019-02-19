import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import moment = require('moment');

@Injectable()
export class DatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (moment(value).isValid()) {
      return new Date(value);
    }
    throw new BadRequestException();
  }
}
