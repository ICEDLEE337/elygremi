import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'oninet-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Output() click = new EventEmitter();
  @Input() disabled: boolean;
  @Input() busy: boolean;
  @Input() color: string;

  onClick($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    if (!this.busy) {
      this.click.next(true);
    }
  }
}
