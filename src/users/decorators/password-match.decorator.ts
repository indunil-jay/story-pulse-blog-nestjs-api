import { ClassConstructor } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Custom decorator to validate that a property matches another property in the same class.
 * @param type - The class containing the property to match.
 * @param property - A function that returns the value of the property to match against.
 * @param validationOptions - Optional validation options.
 */
export const Match = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => any,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};

/** Validation contraints for custom property validator */
@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  /**
   * Validates that the property value matches the value of the specified property.
   * @param value - The value of the property being validated.
   * @param args - Validation arguments containing the object and constraints.
   * @returns True if the values match, otherwise false.
   */
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    return fn(args.object) === value;
  }

  /**
   * Provides the default error message when validation fails.
   * @param args - Validation arguments containing the property being validated and constraints.
   * @returns A string representing the error message.
   */
  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} do not match`;
  }
}
