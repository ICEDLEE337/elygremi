import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'oninet-accent-button',
  templateUrl: './accent-button.component.html',
})
export class AccentButtonComponent {
  @Output() click = new EventEmitter();
}
