import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDirective } from './directives/svg.directive';
import { SvgInfoComponent } from './components/svg-info.component';
import { MatDialogModule } from '@angular/material/dialog';

const declarations = [SvgDirective, SvgInfoComponent];

@NgModule({
  imports: [CommonModule, MatDialogModule],
  schemas: [NO_ERRORS_SCHEMA],
  declarations,
  exports: declarations,
})
export class AngularInkscapeModule {}
