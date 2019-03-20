import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class LatitudinePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && Math.abs(value) <= 90) {
      return value;
    }
    throw new BadRequestException();
  }
}
