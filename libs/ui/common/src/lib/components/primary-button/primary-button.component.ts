import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'oninet-primary-button',
  templateUrl: './primary-button.component.html',
})
export class PrimaryButtonComponent {
  @Output() click = new EventEmitter();
  @Input() disabled: boolean;
  @Input() busy: boolean;

  emitClick($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    if (!this.busy) {
      this.click.next(true);
    }
  }
}
