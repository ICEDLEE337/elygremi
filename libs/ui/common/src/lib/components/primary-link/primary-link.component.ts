import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'oninet-primary-link',
  templateUrl: './primary-link.component.html',
})
export class PrimaryLinkComponent {
  @Input() href: string;
  @Input() routerLink: any;
}
