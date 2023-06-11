import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDirective } from './directives/svg.directive';

const declarations = [SvgDirective];

@NgModule({
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  declarations,
  exports: declarations,
})
export class AngularInkscapeModule {}
