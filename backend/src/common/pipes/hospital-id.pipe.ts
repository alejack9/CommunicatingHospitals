import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

/**
 * could be usefull even if it's unused
 */

@Injectable()
export class HospitalIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Types.ObjectId.isValid(value as string)) {
      return Types.ObjectId(value);
    }
    throw new BadRequestException(`Bad Request`);
  }
}
