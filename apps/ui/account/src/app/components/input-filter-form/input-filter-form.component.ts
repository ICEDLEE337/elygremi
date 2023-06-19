import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IDynaForm,
  IFieldConfig,
  template,
} from '@onivoro/angular-forms';

export type TFilter = { filter: string };

@Component({
  selector: 'oninet-input-filter-form',
  template,
})
export class InputFilterFormComponent implements IDynaForm<TFilter>, OnInit {
  ngOnInit(): void {
    this.options = {
      fieldOptions: {
        filter: { label: this.label || 'Filter', type: 'string' },
      },
      fieldLayout: [['filter']],
    };
  }
  @Input() label!: string;
  @Input() data!: TFilter;
  options: IFieldConfig;
  @Output() statusChange = new EventEmitter();
  @Output() valueChange = new EventEmitter();
}
