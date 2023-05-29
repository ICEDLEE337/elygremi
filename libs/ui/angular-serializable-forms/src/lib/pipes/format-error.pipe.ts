import { Pipe, PipeTransform } from '@angular/core';
import { formattedErrors } from '../constants/formatted-errors.constant';
import { getErrorMessage } from '../constants/get-error-message.function';

@Pipe({ name: 'formatError' })
export class FormatErrorPipe implements PipeTransform {
  transform(err: any, controlName?: string) {
    return getErrorMessage(formattedErrors, err, controlName)?.toUpperCase();
  }
}
