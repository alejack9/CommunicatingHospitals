import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PointPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      value = JSON.parse(value);
      if (
        value &&
        value.lat &&
        value.lng &&
        Math.abs(value.lng) <= 180 &&
        Math.abs(value.lat) <= 90
      ) {
        return value;
      }
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
