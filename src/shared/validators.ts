import { ValidationOptions, ValidateIf } from 'class-validator';

export function IsNullable(options?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, options);
}
