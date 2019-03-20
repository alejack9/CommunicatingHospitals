import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DistancePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value > 0) {
      return value;
    }
    throw new BadRequestException();
  }
}
