import { Component, Input } from '@angular/core';

@Component({
  selector: 'oninet-busy',
  templateUrl: './busy.component.html',
  styles: [':host { width: 100%; }'],
})
export class BusyComponent {
  @Input() busy: boolean = true;
}
