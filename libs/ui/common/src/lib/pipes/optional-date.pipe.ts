import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

@Pipe({ name: 'optionalDate' })
export class OptionalDatePipe implements PipeTransform {
  transform(value: string) {
    return value && dateRegex.test(value)
      ? this.datePipe.transform(value, 'YYYY-MM-dd')
      : value;
  }

  constructor(private datePipe: DatePipe) {}
}
