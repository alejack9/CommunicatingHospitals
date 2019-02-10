import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';

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
    return 'Coordinates are not in bound.';
  }
}
