import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class LongitudinePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Math.abs(value) <= 180) {
      return value;
    }
    throw new BadRequestException();
  }
}
