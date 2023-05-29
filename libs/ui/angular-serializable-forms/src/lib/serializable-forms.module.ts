import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormComponent } from './components/form/form.component';
import { GenericLabelPipe } from './pipes/generic-label.pipe';
import { GenericOptionsPipe } from './pipes/generic-options.pipe';
import { GenericTypePipe } from './pipes/generic-type.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericAttributePipe } from './pipes/generic-attribute.pipe';
import { ErrorComponent } from './components/error/error.component';
import { FormatErrorPipe } from './pipes/format-error.pipe';
import { FieldComponent } from './components/field/field.component';

const components = [ErrorComponent, FormComponent, FieldComponent];
const pipes = [
  FormatErrorPipe,
  GenericOptionsPipe,
  GenericLabelPipe,
  GenericTypePipe,
  GenericAttributePipe,
];
const declarations = [...components, ...pipes];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
  ],
  declarations,
  exports: declarations,
})
export class SerializableFormsModule {}
