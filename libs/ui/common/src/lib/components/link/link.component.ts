import { Component, Input } from '@angular/core';

@Component({
  selector: 'oninet-link',
  templateUrl: './link.component.html',
})
export class LinkComponent {
  @Input() color: string;
  @Input() href: string;
  @Input() routerLink: any;
}
