import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'oninet-accent-link',
  templateUrl: './accent-link.component.html',
})
export class AccentLinkComponent {
  @Input() href: string;
  @Input() routerLink: any;
}
