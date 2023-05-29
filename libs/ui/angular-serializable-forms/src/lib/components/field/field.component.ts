import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILookup } from '../../interfaces/lookup.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';

@Component({
  selector: 'dyna-field',
  styleUrls: ['./field.component.scss'],
  templateUrl: './field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit {
  @Input() label: string;
  @Input() appearance = 'outline';
  @Input() field: string;
  @Input() type: string;
  @Input() options?: ILookup<string, any>[];
  @Input() readOnly!: boolean;
  @Input() form!: FormGroup;
  uiOptions: IFieldConfig;

  ngOnInit() {
    this.uiOptions = {
      fieldOptions: {
        [this.field]: {
          label: this.label,
          type: this.type,
          options: this.options,
        },
      },
      fieldLayout: [[this.field]],
    };
  }

  trackByOptionValue(_index: number, obj: { value: any }) {
    return obj.value;
  }
}
