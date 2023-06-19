import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultApi, Org, User } from '@oninet/generated/account';
import {
  formatRegexes,
  IDynaForm,
  IFieldConfig,
  template,
} from '@onivoro/angular-forms';

const urlValidators = {
  validators: [
    Validators.pattern(formatRegexes.protocol),
    Validators.pattern(formatRegexes.url),
  ],
};

@Component({
  selector: 'oninet-dyna-org-form',
  template,
})
export class DynaOrgFormComponent implements OnInit, IDynaForm<Org> {
  @Input() data!: Org;
  @Input() user!: User;
  @Output() valueChange = new EventEmitter();
  @Output() statusChange = new EventEmitter();
  org: Org;

  constructor(private fb: FormBuilder, private api: DefaultApi) {}
  options: IFieldConfig;

  async ngOnInit() {
    this.options = {
      fieldOptions: {
        name: {
          label: 'Name',
          type: 'text',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(80),
          ],
        },
        phone: {
          label: 'Phone',
          type: 'text',
          validators: [Validators.pattern(formatRegexes.phone)],
        },
        street: { label: 'Street', type: 'text' },
        city: { label: 'City', type: 'text' },
        state: { label: 'State', type: 'text' },
        zip: {
          label: 'Zip',
          type: 'text',
          validators: [Validators.pattern(formatRegexes.zip)],
        },
        logoUrl: { label: 'Logo URL', type: 'text', ...urlValidators },
        codeOfConductUrl: {
          label: 'Website URL',
          type: 'text',
          ...urlValidators,
        },
      },
      fieldLayout: [
        ['name', 'phone'],
        ['street', 'city'],
        ['state', 'zip'],
        ['logoUrl', 'codeOfConductUrl'],
      ],
    };
  }
}
