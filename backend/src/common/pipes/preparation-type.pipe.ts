import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { PreparationType, PreparationTypesArray } from '../preparation.type';

@Injectable()
export class PreparationTypePipe
  implements PipeTransform<string, PreparationType> {
  transform(value: string, metadata: ArgumentMetadata): PreparationType {
    if (PreparationTypesArray.indexOf(value) === -1) {
      throw new BadRequestException(
        `'${value}' is not a known preparation type`,
      );
    }
    return value as PreparationType;
  }
}
