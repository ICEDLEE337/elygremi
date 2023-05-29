import { Pipe, PipeTransform } from '@angular/core';
import snake from 'lodash.snakecase';
import upperfirst from 'lodash.upperfirst';

@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
  transform(key: string) {
    return snake(key)
      .split('_')
      .map((x) => upperfirst(x))
      .join(' ');
  }
}
