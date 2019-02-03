import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { LoggerService } from 'src/utils/tools/logger.service';

@ValidatorConstraint({ name: 'validCoordinates', async: false })
export class CoordinatesValidator implements ValidatorConstraintInterface {
  validate(coordinates: [number], args: ValidationArguments) {
    if (!coordinates) {
      return false;
    }
    const coord = [...coordinates];
    // long, lat
    return (
      coord.length === 2 &&
      Math.abs(coord[0]) <= 180 &&
      Math.abs(coord[1]) <= 90
    );
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Coordinates are not in bound.';
  }
}
